import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform, TextStyle } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, RotateCw, Check, X as XIcon } from 'lucide-react-native';

type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';

function generateQuestion(operation: Operation) {
  let num1: number, num2: number;

  switch (operation) {
    case 'addition':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      return { num1, num2, answer: num1 + num2 };

    case 'subtraction':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      return { num1, num2, answer: num1 - num2 };

    case 'multiplication':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      return { num1, num2, answer: num1 * num2 };

    case 'division':
      num2 = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      return { num1, num2, answer: num1 / num2 };
  }
}

function getOperationSymbol(operation: Operation) {
  switch (operation) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '×';
    case 'division': return '÷';
  }
}

export default function Flashcards() {
  const { operation } = useLocalSearchParams<{ operation: Operation }>();
  const [question, setQuestion] = useState(() => generateQuestion(operation as Operation));
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const generateNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(operation as Operation);
    setQuestion(newQuestion);
    setUserAnswer('');
    setIsCorrect(null);
    setShowFeedback(false);
  }, [operation]);

  const checkAnswer = useCallback(() => {
    const numericAnswer = parseFloat(userAnswer);
    const isAnswerCorrect = !isNaN(numericAnswer) &&
      (operation === 'division'
        ? Math.abs(numericAnswer - question.answer) < 0.01
        : numericAnswer === question.answer);

    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setUserAnswer('');

    if (isAnswerCorrect) {
      setTimeout(() => {
        generateNewQuestion();
      }, 1500);
    }
  }, [userAnswer, operation, question.answer, generateNewQuestion]);

  const handleInputChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9.-]/g, '');

    const decimalCount = (sanitizedText.match(/\./g) || []).length;
    if (decimalCount > 1) return;

    const negativeCount = (sanitizedText.match(/-/g) || []).length;
    if (negativeCount > 1 || (sanitizedText.includes('-') && sanitizedText.indexOf('-') !== 0)) return;

    setUserAnswer(text);
  };

  const questionString = `${question.num1} ${getOperationSymbol(operation as Operation)} ${question.num2} = `

  return (
    <View style={viewStyles.container}>
      <View style={viewStyles.header}>
        <Pressable onPress={() => router.back()} style={viewStyles.backButton}>
          <ArrowLeft size={24} color="#212529" />
        </Pressable>
        <Text style={textStyles.title}>{operation.charAt(0).toUpperCase() + operation.slice(1)}</Text>
        <Pressable
          onPress={generateNewQuestion}
          style={viewStyles.nextButton}
          accessibilityLabel="Generate new question"
        >
          <RotateCw size={24} color="#212529" />
        </Pressable>
      </View>

      <View style={viewStyles.problemContainer}>
        <View style={viewStyles.problem}>
          <Text style={textStyles.questionText}>
            {question ? questionString : 'Loading...'}
          </Text>
          <TextInput
            style={[
              textStyles.input,
              Platform.OS === 'web' && styles.webInput,
              showFeedback && (isCorrect ? textStyles.correctInput : textStyles.incorrectInput)
            ]}
            value={userAnswer}
            maxLength={2}
            onChangeText={handleInputChange}
            keyboardType={Platform.OS === 'web' ? 'numeric' : 'decimal-pad'}
            onSubmitEditing={checkAnswer}
          />
        </View>

        <Pressable
          style={viewStyles.checkButton}
          onPress={checkAnswer}
          disabled={userAnswer.length === 0}
        >
          <Text style={textStyles.checkButtonText}>Check Answer</Text>
        </Pressable>

        {showFeedback && (
          <View style={[viewStyles.feedback, isCorrect ? viewStyles.correctFeedback : viewStyles.incorrectFeedback]}>
            {isCorrect ? (
              <>
                <Check size={24} color="#4CAF50" />
                <Text style={[textStyles.feedbackText, textStyles.correctText]}>Correct!</Text>
              </>
            ) : (
              <>
                <XIcon size={24} color="#F44336" />
                <Text style={[textStyles.feedbackText, textStyles.incorrectText]}>
                  Try again!
                </Text>
              </>
            )}
          </View>
        )}
      </View>

      <Text style={textStyles.hint}>Enter your answer and press Check Answer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webInput: {
    outlineStyle: 'none',
  } as TextStyle
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#212529',
  },
  hint: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#6C757D',
  },
  feedbackText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginLeft: 10,
  },
  correctText: {
    color: '#4CAF50',
  },
  incorrectText: {
    color: '#F44336',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  input: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    color: '#212529',
    borderWidth: 2,
    borderColor: '#DEE2E6',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 40,
    textAlign: 'center',
  },
  correctInput: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  incorrectInput: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  questionText: {
    fontSize: 48,
    fontFamily: 'Nunito-Bold',
    color: '#212529',
  },
});

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 40,
  },
  backButton: {
    padding: 10,
  },
  nextButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  correctFeedback: {
    backgroundColor: '#E8F5E9',
  },
  incorrectFeedback: {
    backgroundColor: '#FFEBEE',
  },
  checkButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  checkButtonDisabled: {
    backgroundColor: '#B2DFDB',
  },
  problemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 400,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  problem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});