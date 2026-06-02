import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import colors from "../theme/colors";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      navigation.replace("Tabs");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            color: colors.textColor,
            fontSize: 34,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Log In
        </Text>

        <Text
          style={{
            color: colors.inActiveColor,
            textAlign: "center",
            marginBottom: 35,
          }}
        >
          Welcome back to Movie App
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.inActiveColor}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: colors.movieBackgroundColor,
            color: colors.textColor,
            padding: 16,
            borderRadius: 12,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.inActiveColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: colors.movieBackgroundColor,
            color: colors.textColor,
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: colors.buttonColor,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={{
            marginTop: 25,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.activeColor,
              fontSize: 14,
            }}
          >
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
