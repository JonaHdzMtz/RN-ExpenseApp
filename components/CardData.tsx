import React from "react"
import { StyleSheet, Image, View, Text, Pressable, Dimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const { width, height } = Dimensions.get('window');
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { CreateContext } from '../context/ContextProvider';
interface infoCard {
    idExpense: string,
    title: string,
    price: number,
    date: string,
    picture?: string,
    category: string,
}


export const CardData = (props: infoCard) => {
    const {theme} = useContext(CreateContext);
    const navigation: any = useNavigation();
    const [colorTag, setColorTag] = useState<string>('');

    const changeColorTag = () => {
        switch (props.category) {
            case 'alimentos':
                return "red";
            case 'servicios':
                return 'blue';
            case 'transporte':
                return 'green';
            case 'salud':
                return 'yellow';
            case 'educacion':
                return 'purple';
        }
    }

    const handleUpdatePage = () => {
        navigation.navigate("updateData",{
            updateData : true,
            idExpense : props.idExpense
        })
    }

    return (
        <Pressable onPress={ handleUpdatePage} style={[styles.container,{backgroundColor:theme.primary}]}>
            {props.picture ? (<Image style={styles.image} source={{ uri: `data:image/jpg;base64,${props.picture}` }} />) : (<FontAwesome6  name="file-invoice-dollar" size={90} color={theme.name ==="dark"? "white" : "black"} />)}
            <View style={styles.cardInfo}>
                <View style={styles.infoTagContainer}>
                    <Text style={[styles.title, {color : theme.color}]}>{props.title}</Text>
                    <Text style= {{color : theme.color}}>{`costo: $${props.price}`}</Text>
                    <Text style= {{color : theme.color}}>{`fecha: ${props.date}`}</Text>
                    <Text style= {{color : theme.color}}>{`categoria: ${props.category}`}</Text>
                </View>
                {/* ETIQUETA DE COLOR DE CATEGORIA */}
                <View style={[styles.tag, { backgroundColor: changeColorTag() }]}></View>
            </View>
        </Pressable>
    )
}

const styles :any = StyleSheet.create({
    container: {
        height: 100,
        width: width * 0.9,
        borderRadius: 10,
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    cardInfo: {
        flex: 1,
        height: 100,
        flexDirection: "row",
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 15,
    },
    infoTagContainer: {
        width: "95%",
    },
    tag: {
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})