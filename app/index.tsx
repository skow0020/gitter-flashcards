import { View, Text, StyleSheet, Pressable, Platform, Dimensions, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Plus, Minus, X, Divide } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const operations: { name: string; icon: any; color: [string, string] }[] = [
  { name: 'Addition', icon: Plus, color: ['#FF6B6B', '#FF8787'] },
  { name: 'Subtraction', icon: Minus, color: ['#4ECDC4', '#45B7AF'] },
  { name: 'Multiplication', icon: X, color: ['#FFD93D', '#F6C90E'] },
  { name: 'Division', icon: Divide, color: ['#95A5A6', '#7F8C8D'] },
];

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gitter Flashcards</Text>
      <Text style={styles.subtitle}>Choose your challenge!</Text>

      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {operations.map((op) => (
            <Pressable
              key={op.name}
              style={styles.cardContainer}
              onPress={() => router.push({
                pathname: '/flashcards',
                params: { operation: op.name.toLowerCase() }
              })}
            >
              <LinearGradient
                colors={op.color}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <op.icon size={40} color="white" />
                <Text style={styles.cardText}>{op.name}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    color: '#212529',
    marginTop: 60,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#6C757D',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  gridContainer: {
    paddingHorizontal: Platform.OS === 'web' ? (screenWidth > 1200 ? 300 : screenWidth > 800 ? 50 : 20) : 0, // Responsive padding for web only
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  cardContainer: {
    width: Platform.OS === 'web' ? '48%' : '47%', // Adjust width for web
    aspectRatio: 1, // Adjust aspect ratio for web
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardText: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: 'white',
  },
});