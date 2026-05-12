import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import MyTabs from "./src/navigation/BottomTabs";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
