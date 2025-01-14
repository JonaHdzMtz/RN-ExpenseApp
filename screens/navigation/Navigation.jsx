import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddData } from "../tabGroup/AddData"
import { HistoryData } from '../tabGroup/HistoryData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
const BottonBar = createBottomTabNavigator();

const TabGroup = () => {
    return (
        <BottonBar.Navigator>
            <BottonBar.Screen
                name='Historial'
                component={HistoryData}
                options={{
                    
                    headerTitleAlign: 'center',
                    tabBarIcon: () => (<FontAwesome name="home" size={24} color="black" />)
                }} />
            <BottonBar.Screen
                name='Agregar'
                component={AddData}
                options={{
                    tabBarIcon: () => (<AntDesign name="pluscircleo" size={24} color="black" />),
                    headerTitleAlign: 'center'
                }}
            />
        </BottonBar.Navigator>
    )
}

export const Navigation = () => {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    )
}