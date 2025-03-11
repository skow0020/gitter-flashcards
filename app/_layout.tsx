import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    'Nunito-Regular': Nunito_400Regular,
    'Nunito-Bold': Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="flashcards" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}