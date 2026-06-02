import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MyTabs from "./BottomTabs";
import colors from "../theme/colors";
import { s } from "react-native-size-matters";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen name="Tabs" component={MyTabs} />

      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.backgroundColor,
          },
          headerTitleStyle: {
            color: colors.textColor,
            fontSize: s(18),
          },
          headerTintColor: colors.textColor,
          title: "Movie Details",
        }}
        name="DetailsScreen"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
