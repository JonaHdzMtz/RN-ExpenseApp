import { StyleSheet, View, Text, TextInput, Alert, Image, Pressable, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {Picker} from '@react-native-picker/picker';
import { insertExpense } from '../../service/ExpenseService';


export const AddData = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [openCamera, setOpenCamera] = useState(false);
    const { width, height } = Dimensions.get('window');
    const pictureRef = useRef(null);
    const [pictureSaved, setPictureSaved] = useState("");

    //Campos del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("alimentos");
    const [price, setPrice] = useState(""); 
    const [base64, setBase64] = useState("");

    // useEffect(() => {
    //     alert(category);
    // }, [category]);

    useEffect(() => {
        if (permission !== null && !permission.granted) {
            requestPermission();
        }
    }, [permission, requestPermission]);

    useEffect(() => {
        if (openCamera) {
            navigation.setOptions({
                tabBarStyle: { display: 'none' },
                headerTitle: "Toma la foto"
            });
        } else {
            navigation.setOptions({
                headerTitle: "Agregar",
                tabBarStyle: { display: 'flex' }
            });
        }

    }, [openCamera]);




    const handleValidatePrice = (value) => {
        const number = parseFloat(value); // Convertir a número
        const isValidNumber = /^\d*\.?\d*$/.test(number);
        if (value === '') {
            setPrice(''); // Restablecer a "0" si está vacío
        } else if (!isNaN(number) && isValidNumber) { // no funciona el isValidNumber
            setPrice(value); // Mantener el valor ingresado si es válido
        } else {
            Alert.alert('Error', 'Solo se permiten números'); // Mostrar alerta
            setPrice(''); // Restablecer a "0" si el valor es inválido
        }
    };


    const takePicture = async () => {
        if (pictureRef) {
            const picture = await pictureRef.current.takePictureAsync({
                quality: 0.3,
                base64: true,
            });
            await setBase64(picture.base64);
            setOpenCamera(!openCamera);
        } else {
            alert("No se pudo tomar la foto");
        }
    }


const handleSaveData = async  (e) => {
    const date = new Date();
    e.preventDefault();
    const newItem = {
        title: title,
        description: description,
        date: date.toLocaleDateString(),
        category: category,
        price: price,
        picture: base64,
    }

    const result =  await insertExpense(newItem);
    if (result.changes > 0) {
        Alert.alert('Guardado', 'El producto ha sido guardado correctamente');
    }else{
        Alert.alert('Error', 'No se pudo guardar el producto');
    }
}

    return (
        <ScrollView >
            {openCamera === false && (
                <View style={styles.container}>
                    <Text style={styles.text}>Producto/Servicio:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="luz eléctrica"
                        value={title}
                        onChangeText={setTitle} // Actualizar directamente el estado de producto
                    />
                    <Text style={styles.text}>Costo (MXN):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="$0.00"
                        keyboardType="numeric"
                        value={price} // Mostrar el valor como cadena
                        onChangeText={setPrice} // Validar la entrada de precio
                    />
                    <Text style={styles.text}>Categoria:</Text>
                    <Picker
                        selectedValue={ "alimentos" }
                        style={{ height: 50, width: "100%"}}
                        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                        <Picker.Item label="Alimentos" value="alimentos" />
                        <Picker.Item label="Servicios" value="servicios" />
                        <Picker.Item label="Transporte" value="transporte" />
                        <Picker.Item label="Salud" value="salud" />
                        <Picker.Item label="Educación" value="educación" />
                        </Picker>
                    <Text style={styles.text}>Descripcion(opcional):</Text>
                    <TextInput
                        style={styles.inputDescription}
                        placeholder="Descripción del producto/servicio"
                        numberOfLines={4}
                        maxLength={200}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Image style={styles.image} source={{ uri: `data:image/jpg;base64,${base64}` }}></Image>
                    <View style={styles.containerButtons}>
                        <Pressable style={styles.pressableCamera} onPress={() => setOpenCamera(true)} >
                            <AntDesign name="camerao" size={50} color="black" />
                        </Pressable>
                        <TouchableHighlight style={styles.saveButton} onPress={handleSaveData} underlayColor={"#DDDDDD"}>
                            <Text style={styles.textButton} >Guardar</Text>
                        </TouchableHighlight>
                    </View>
                    {/* imagen de base 64 */}
{/* 
                    <View>
                        <Text>Imagen en base 64: {base64.length}</Text>
                        <Image style={styles.image} source={{ uri: `data:image/jpg;base64,${base64}` }} />
                    </View> */}
                </View>
            )}

            {openCamera && permission && permission.granted && (
                <View style={{ height: height }}>

                    <CameraView style={{ flex: 1 }} ref={pictureRef}>
                        <View style={styles.buttonContainer}>
                        </View>
                    </CameraView>
                    <Pressable style={styles.takePhotoButton} onPress={takePicture} >
                        <AntDesign name="close" size={50} color="black" />
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: 'white',
        gap: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    inputDescription: {
        textAlignVertical: 'top',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    image: {
        height: 200,
        objectFit: "contain",
        borderRadius: 10,
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        backfaceVisibility: 'hidden',
    },
    pressableCamera: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',

    },
    containerButtons: {
        alignItems: 'center',
        gap: 15
    },
    saveButton: {
        height: 50,
        width: "60%",
        borderRadius: 10,
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        justifyContent: 'center',

    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    takePhotoButton: {
        position: 'absolute',
        bottom: 50,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        alignSelf: 'center',
    }
});
