import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddData } from "../tabGroup/AddData";
import { HistoryData } from "../tabGroup/HistoryData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateContext } from "../../context/ContextProvider";
import { useContext } from "react";
import { Settings } from "../tabGroup/settings";
import Ionicons from '@expo/vector-icons/Ionicons';
const BottonBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabGroup = () => {
  const { theme } = useContext(CreateContext);

  return (
    <BottonBar.Navigator
      screenOptions={{
        headerStyle:{
            backgroundColor: theme.primary
        },
        headerTintColor: theme.color,
        tabBarStyle: {
          backgroundColor: theme.primary 
        },
      }}
    >
      <BottonBar.Screen
        name="Historial"
        component={HistoryData}
        options={{
          tabBarIcon: () => (
            <FontAwesome
              name="home"
              size={24}
              color={theme.color}
            />
          ),
        }}
      />
      <BottonBar.Screen
        name="Agregar"
        component={AddData}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name="pluscircleo"
              size={24}
              color={theme.color}
            />
          ),
        }}
      />
      <BottonBar.Screen 
      name="Configuraciones"
      component={Settings}
      options={{
        tabBarIcon: ()=>(
            <Ionicons name="settings-outline" size={24} color={theme.color} />
        )
      }}/>
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
  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
};
