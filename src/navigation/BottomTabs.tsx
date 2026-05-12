import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { s } from "react-native-size-matters";
import colors from "../theme/colors";
import CategoriesScreen from "../screens/CategoriesScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundColor },
        headerTitleStyle: { color: colors.textColor, fontSize: s(18) },
        headerTintColor: colors.textColor,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          borderTopColor: colors.borderColor,
        },
        tabBarActiveTintColor: colors.activeColor,
        tabBarInactiveTintColor: colors.inActiveColor,
        tabBarLabelStyle: { fontSize: s(12) },
        tabBarIcon: ({ color, size, focused }) => null,
      }}
    >
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="home" size={s(20)} color={color} />;
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="albums" size={s(20)} color={color} />;
          },
        }}
        name="Categories"
        component={CategoriesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="bookmark" size={s(20)} color={color} />;
          },
        }}
        name="Saved"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
