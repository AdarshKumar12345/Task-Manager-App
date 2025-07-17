import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import MyTasks from '@/constants/MyTasks'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/config"; 
import { Snackbar } from "react-native-paper";

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const onShowSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };
  const handleLogin = async () => {
    // Add login logic here (API call / auth)
    // On success:
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return onShowSnackbar("Please fill all fields");
    }
    console.log("Login Attempt:", { email, password });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace({
        pathname: "/(tabs)/Home",
      });

    } catch (error) {
      onShowSnackbar("Login failed. Please check your credentials.");
      console.error("Login Error", error);
    }

    // router.push({
    //   pathname: "/home",
    //   params: { tasks: taskArray }, // must match the type
    // }); // Replace with actual route
    
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subHeader}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText} >Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/SignUp")}>
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    color: "#000", // Ensures black input text
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#777",
  },
  link: {
    color: "#007AFF",
    fontWeight: "500",
  },
});
