import { StyleSheet, Image, View, Text, Pressable, Dimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const { width, height } = Dimensions.get('window');

export const CardData = (props) => {
    return (
        <Pressable onPress={() => alert('Hola')} style={styles.container}>
            {props.picture? ( <Image style={styles.image} source={{ uri: `data:image/jpg;base64,${props.picture}` }} />) :  (<FontAwesome6 name="file-invoice-dollar" size={90} color="black" />) }
            <View style={styles.cardInfo}>
                <View style={styles.infoTagContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text styles={styles.title}>{`costo: $${props.price}`}</Text>
                    <Text styles={styles.title}>{`fecha: ${props.date}`}</Text>
                </View>
                {/* ETIQUETA DE COLOR DE CATEGORIA */}
                <View style={styles.tag }></View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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
        color: 'red'
    },
    infoTagContainer: {
        width: "95%",
    },
    tag: {
        flex: 1,
        backgroundColor: 'blue',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})