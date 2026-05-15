import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { s } from "react-native-size-matters";
import colors from "../theme/colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import SavedScreen from "../screens/SavedScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundColor },
        headerTitleStyle: { color: colors.textColor, fontSize: s(24) },
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
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="albums" size={s(20)} color={color} />;
          },
        }}
        name="CategoriesScreen"
        component={CategoriesScreen}
      />
      <Tab.Screen
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="bookmark" size={s(20)} color={color} />;
          },
        }}
        name="SavedScreen"
        component={SavedScreen}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
