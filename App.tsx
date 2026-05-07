import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import MyTabs from "./src/navigation/BottomTabs";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      <StatusBar style="light" /> // Bu satır, durum çubuğunun stilini "light"
      olarak ayarlar, böylece beyaz renkli metin ve simgeler görünür hale gelir.
      Bu, genellikle koyu arka planlarda tercih edilir.
    </NavigationContainer>
  );
}
//test
// feature branch test
