import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddData } from "../tabGroup/AddData"
import { HistoryData } from '../tabGroup/HistoryData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateContext } from '../../context/ContextProvider';
import { useContext } from 'react';
const BottonBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const TabGroup = () => {
    const { theme } = useContext(CreateContext);
    const backgroundTop = theme === 'light' ? 'white' : 'black'
    return (
        <BottonBar.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: backgroundTop
                },
                headerTintColor: theme === 'light' ? 'black' : 'white',
                tabBarStyle: {
                    // backgroundColor: theme === "dark" ? "black" : "white",
                },
                // tabBarActiveTintColor: theme === "light" ? "black" : "white", // Color de las etiquetas activas
                // // Cambia el color de las etiquetas inactivas a un color que tenga buen contraste
                // tabBarInactiveTintColor: theme === "light" ? "black" : "white", // Color de las etiquetas inactivas
            }}>
            <BottonBar.Screen
                name='Historial'
                component={HistoryData}
                options={{
                    headerTitleAlign: 'center',
                    tabBarIcon: () => (<FontAwesome name="home" size={24} color={theme === "dark" ? "dark" : "black"} />),
                    color: theme === 'light' ? 'black' : 'white'
                }}
            />

            <BottonBar.Screen
                name='Agregar'
                component={AddData}
                options={{
                    tabBarIcon: () => (<AntDesign name="pluscircleo" size={24} color={theme === "dark" ? "dark" : "black"} />),
                    headerTitleAlign: 'center',
                }}

            />
        </BottonBar.Navigator>
    )
}

const StackGroup = () => {
    const { theme } = useContext(CreateContext);
    const backgroundTop = theme === 'light' ? 'white' : 'black'
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: backgroundTop,
            },
            headerTintColor: theme === 'light' ? 'black' : 'white',
        }}>
            <Stack.Screen options={{ headerShown: false }} name='tabGroup' component={TabGroup} />
            <Stack.Screen name='updateData' component={AddData} />
        </Stack.Navigator>
    )
}

export const Navigation = () => {
    return (
        <NavigationContainer>

            <StackGroup />
        </NavigationContainer>
    )
}