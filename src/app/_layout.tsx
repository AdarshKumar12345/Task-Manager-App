import {
  DarkTheme,
  DefaultTheme, 
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const AuthGate = () => {
  const { user } = useAuth();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)/Home"  />
      ) : (
        <Stack.Screen name="(auth)/Login" />
      )}
    </Stack>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <PaperProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaView style={styles.container}>
            <AuthGate />

            <StatusBar style="auto" />
          </SafeAreaView>
        </ThemeProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
