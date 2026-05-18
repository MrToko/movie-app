import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { MovieProvider } from "./src/context/MovieContext";

import { signInAnonymously } from "firebase/auth";
import { auth } from "./src/firebase/config";

export default function App() {
  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log("Anonymous user signed in");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MovieProvider>
      <NavigationContainer>
        <MainStackNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </MovieProvider>
  );
}
