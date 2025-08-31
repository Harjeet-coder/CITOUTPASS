import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Navigate based on role
        if (role === "student") navigation.replace("StudentDashboard");
        else if (role === "teacher") navigation.replace("TeacherDashboard");
        else if (role === "hod") navigation.replace("HodDashboard");
        else if (role === "warden") navigation.replace("WardenDashboard");
        else if (role === "security") navigation.replace("SecurityDashboard");
      } else {
        Alert.alert("Error", "No role found for this user.");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "black"
  },
  title: {
    color: "yellow",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  button: {
    backgroundColor: "yellow",
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black"
  }
});
