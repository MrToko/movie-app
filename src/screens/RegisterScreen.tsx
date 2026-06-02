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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import colors from "../theme/colors";

export default function RegisterScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await updateProfile(result.user, {
        displayName: `${firstName} ${lastName}`,
      });

      Alert.alert("Success", "Account created successfully");

      navigation.replace("Tabs");
    } catch (error: any) {
      Alert.alert("Register Error", error.message);
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
          Create Account
        </Text>

        <Text
          style={{
            color: colors.inActiveColor,
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Join Movie App
        </Text>

        <TextInput
          placeholder="First Name"
          placeholderTextColor={colors.inActiveColor}
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <TextInput
          placeholder="Last Name"
          placeholderTextColor={colors.inActiveColor}
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.inActiveColor}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.inActiveColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={colors.inActiveColor}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: colors.buttonColor,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.activeColor,
            }}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  input: {
    backgroundColor: colors.movieBackgroundColor,
    color: colors.textColor,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
};
