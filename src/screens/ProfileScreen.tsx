import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useMovieContext } from "../context/MovieContext";
import colors from "../theme/colors";

export default function ProfileScreen({ navigation }: any) {
  const user = auth.currentUser;

  const { savedMovies } = useMovieContext();

  const initials =
    user?.displayName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigation.getParent()?.navigate("LoginScreen");
    } catch (error) {
      Alert.alert("Error", "Logout failed");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.buttonColor,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 36,
              fontWeight: "bold",
            }}
          >
            {initials}
          </Text>
        </View>

        <Text
          style={{
            color: colors.textColor,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {user?.displayName || "Movie User"}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.movieBackgroundColor,
          padding: 18,
          borderRadius: 16,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: colors.inActiveColor,
            marginBottom: 6,
          }}
        >
          Full Name
        </Text>

        <Text
          style={{
            color: colors.textColor,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {user?.displayName || "Not Available"}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.movieBackgroundColor,
          padding: 18,
          borderRadius: 16,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: colors.inActiveColor,
            marginBottom: 6,
          }}
        >
          Email Address
        </Text>

        <Text
          style={{
            color: colors.textColor,
            fontSize: 16,
          }}
        >
          {user?.email || "Not Available"}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.movieBackgroundColor,
          padding: 18,
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: colors.inActiveColor,
            marginBottom: 6,
          }}
        >
          User ID
        </Text>

        <Text
          style={{
            color: colors.textColor,
            fontSize: 13,
          }}
        >
          {user?.uid}
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          backgroundColor: colors.movieBackgroundColor,
          padding: 20,
          borderRadius: 16,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: colors.activeColor,
            fontSize: 32,
            fontWeight: "700",
          }}
        >
          {savedMovies.length}
        </Text>

        <Text
          style={{
            color: colors.textColor,
            marginTop: 5,
          }}
        >
          Saved Movies
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.movieBackgroundColor,
          padding: 18,
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: colors.textColor,
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Account Status
        </Text>

        <Text
          style={{
            color: "#22c55e",
          }}
        >
          ● Active
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          padding: 16,
          borderRadius: 14,
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
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
