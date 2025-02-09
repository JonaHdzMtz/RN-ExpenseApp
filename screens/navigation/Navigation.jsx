import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddData } from "../tabGroup/AddData";
import { HistoryData } from "../tabGroup/HistoryData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateContext } from "../../context/ContextProvider";
import { useContext, useEffect } from "react";
import { Settings } from "../tabGroup/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import  AsyncStorage  from "@react-native-async-storage/async-storage";

const BottonBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabGroup = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(CreateContext);
  return (
    <BottonBar.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.secondary,
        },
        headerTintColor: theme.color,
        tabBarStyle: {
          backgroundColor: theme.primary,
          borderColor: theme.backgroundColor,
        },
        tabBarActiveBackgroundColor: theme.backgroundColor,
        tabBarActiveTintColor: theme.color,
        animation: "shift",
      }}
    >
      <BottonBar.Screen
        name="Historial"
        component={HistoryData}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color={theme.color} />
          ),
        }}
      />
      <BottonBar.Screen
        name="Agregar"
        component={AddData}
        options={{
          tabBarIcon: () => (
            <AntDesign name="pluscircleo" size={24} color={theme.color} />
          ),
        }}
      />
      <BottonBar.Screen
        name="Configuraciones"
        component={Settings}
        options={{
          tabBarIcon: () => (
            <Ionicons name="settings-outline" size={24} color={theme.color} />
          ),
        }}
      />
    </BottonBar.Navigator>
  );
};

const StackGroup = () => {
  const { theme } = useContext(CreateContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        navigationBarColor: theme.primary,
        headerTintColor: theme === "light" ? "black" : "white",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="tabGroup"
        component={TabGroup}
      />
      <Stack.Screen name="updateData" component={AddData} />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  //recuperar tipo de card
  useEffect(() => {
    const value = AsyncStorage.getItem("cardType").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("cardType", "boxCard").then(
          console.log("almacenado correctamente")
        );
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
};
