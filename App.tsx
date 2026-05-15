import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { StatusBar } from "expo-status-bar";
import { MovieProvider } from "./src/context/MovieContext";

export default function App() {
  return (
    <MovieProvider>
      <NavigationContainer>
        <MainStackNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </MovieProvider>
  );
}
