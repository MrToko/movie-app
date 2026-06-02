import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";

import Ionicons from "@expo/vector-icons/Ionicons";
import { s } from "react-native-size-matters";
import colors from "../theme/colors";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerTitleStyle: {
          color: colors.textColor,
          fontSize: s(24),
        },
        headerTintColor: colors.textColor,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          borderTopColor: colors.borderColor,
        },
        tabBarActiveTintColor: colors.activeColor,
        tabBarInactiveTintColor: colors.inActiveColor,
        tabBarLabelStyle: {
          fontSize: s(10),
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={s(20)} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={s(20)} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark" size={s(20)} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={s(20)} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
