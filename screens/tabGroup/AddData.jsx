import { StyleSheet, View, Text, TextInput, Alert, Image, Pressable, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect, useRef, useContext } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Picker } from '@react-native-picker/picker';
import { insertExpense, getItemExpense, updateItemExpense, deleteItemExpense } from '../../service/ExpenseService';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { CreateContext } from '../../context/ContextProvider';
const { width, height } = Dimensions.get('window');

export const AddData = ({ navigation, route }) => {
    const {theme} = useContext(CreateContext);
    const { updateData, idExpense } = route.params || {};
    const [permission, requestPermission] = useCameraPermissions();
    const [openCamera, setOpenCamera] = useState(false);
    const pictureRef = useRef(null);
    const [pictureSaved, setPictureSaved] = useState("");

    //Campos del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("alimentos");
    const [price, setPrice] = useState("");
    const [base64, setBase64] = useState("");



    useEffect(() => {
        if (updateData !== undefined) {
            //recuperar informacion
            getItemExpense(idExpense)
                .then((result) => {
                    console.log("result", result);

                    setTitle(result.title);
                    setDescription(result.description);
                    setCategory(result.category);
                    setPrice(result.price.toString());
                    setBase64(result.picture);
                }
                )
        }
    }, [updateData])

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

    const resetFields = () => {
        setTitle("");
        setDescription("");
        setCategory("alimentos");
        setPrice("");
        setBase64("");
    }


    const validateUpdateSave = () => {
        if (updateData !== undefined) {
            handleUpdateData();
        }
        else {
            handleSaveData();
        }
    }

    const handleUpdateData = () => {
        alert("actualizando");
        const item = {
            idExpense: idExpense,
            title: title,
            description: description,
            category: category,
            price: price,
            picture: base64,
        }
        updateItemExpense(item).then((result) => {
            if (result.changes > 0) {
                alert("Se ha actualizado correctamente");
                resetFields();
                navigation.navigate('tabGroup');
            } else {
                alert("No se ha podido actualizar");
            }
        })

    }

    const handleSaveData = async (e) => {
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
        const result = await insertExpense(newItem);
        if (result.changes > 0) {
            Alert.alert('Guardado', 'El producto ha sido guardado correctamente');
            navigation.navigate('Historial');
            resetFields();
        } else {
            Alert.alert('Error', 'No se ha podido guardar el producto');
        }
    }

    const handleDeleteExpenseItem = () => {
        deleteItemExpense(idExpense).then(result=>{
             if(result.changes > 0){
                alert("Se ha eliminado correctamente")
                resetFields();
                navigation.navigate('tabGroup');
                
            }else {
                alert("No se ha podido eliminar")
            }
        }).catch(error=>{
            console.log( error);
        })
    }

    return (
        <ScrollView style={{ height: Dimensions }} >
            {openCamera === false && (
                <View style={theme === "light" ? styles.containerLight : styles.containerDark}>
                    <Text style={theme === "dark" ? styles.textDark : styles.textLight}>Producto/Servicio:</Text>
                    <View style={{ paddingBottom: 10 }}>
                        <TextInput
                            style={theme ==="dark"? styles.inputDark: styles.inputLight}
                            placeholder="luz eléctrica"
                            value={title}
                            onChangeText={setTitle} // Actualizar directamente el estado de producto
                        />
                        {title.length === 0 && <Text style={styles.label} >obligatorio</Text>}
                    </View>
                    <Text style={theme === "dark" ? styles.textDark : styles.textLight}>Costo (MXN):</Text>
                    <View>
                        <TextInput
                            style={theme ==="dark"? styles.inputDark: styles.inputLight}
                            placeholder="$0.00"
                            keyboardType="numeric"
                            value={price} // Mostrar el valor como cadena
                            onChangeText={setPrice} // Validar la entrada de precio
                        />
                        {price.length === 0 && <Text style={[styles.label]} >obligatorio</Text>}

                    </View>

                    <Text style={theme === "dark" ? styles.textDark : styles.textLight}>Categoria:</Text>
                    <View style={theme === "dark" ? styles.pickerDark : styles.pickerLight}>
                        <Picker
                        style = {{color: theme === "dark" ? "white" : "black"}}
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                            <Picker.Item label="Alimentos" value="alimentos" />
                            <Picker.Item label="Servicios" value="servicios" />
                            <Picker.Item label="Transporte" value="transporte" />
                            <Picker.Item label="Salud" value="salud" />
                            <Picker.Item label="Educación" value="educación" />
                        </Picker>
                    </View>

                    <Text style={theme === "dark" ? styles.textDark : styles.textLight}>Descripcion(opcional):</Text>
                    <TextInput
                        style={theme==="dark"? styles.inputDescriptionDark : styles.inputDescriptionLight}
                        placeholder="Descripción del producto/servicio"
                        numberOfLines={4}
                        maxLength={200}
                        value={description}
                        onChangeText={setDescription}
                    />
                    {base64 !== "" && (
                        <Image style={styles.image} source={{ uri: `data:image/jpg;base64,${base64}` }}></Image>
                    )}

                    <View style={styles.containerButtons}>
                        <Pressable style={styles.pressableCamera} onPress={() => setOpenCamera(true)} >
                            <AntDesign name="camerao" size={50} color={theme ==="dark"? "white": "dark"} />
                        </Pressable>
                        <TouchableHighlight disabled={!price.length > 0 || !title.length > 0} style={[styles.saveButton, { backgroundColor: !price.length > 0 || !title.length > 0 ? "#ee676b" : "white" }]} onPress={validateUpdateSave} underlayColor={"#DDDDDD"}>
                            <Text style={styles.textButton} >{updateData !== undefined ? "Actualizar" : "Guardar"}</Text>
                        </TouchableHighlight>
                        {updateData !== undefined && (
                            <Pressable style={styles.saveButton} onPress={handleDeleteExpenseItem} >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </Pressable>
                        )}

                    </View>
                </View>
            )}

            {openCamera && permission && permission.granted && (
                <View style={{ height: height * 0.90 }}>

                    <CameraView style={{ flex: 1 }} ref={pictureRef}>
                        <View style={styles.buttonContainer}>
                        </View>
                    </CameraView>

                    <Pressable style={styles.takePhotoButton} onPress={takePicture} >
                        <EvilIcons name="camera" size={24} color="black" />
                    </Pressable>

                    <Pressable style={styles.backPhotoButton} onPress={() => setOpenCamera(!openCamera)} >
                        <AntDesign name="back" size={24} color="black" />
                    </Pressable>



                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    containerLight: {
        height: height,
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: 'white',
        gap: 10,
    },
    containerDark: {
        height: height,
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: 'black',
        gap: 10,
    },
    textLight: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    textDark: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    inputLight: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        paddingLeft: 10,
    },
    inputDark: {
        height: 40,
        color: 'white',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        paddingLeft: 10,
    },

    inputDescriptionLight: {
        textAlignVertical: 'top',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: 'black'
    },
    inputDescriptionDark: {
        textAlignVertical: 'top',
        height: 100,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: 'white',
        color: 'white',
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
        backgroundColor: 'white',

    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    takePhotoButton: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',

    },
    backPhotoButton: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
    },
    label: {
        color: "#ee676b",
    },
    pickerLight: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderBlockColor: 'black',
        borderRadius: 5,
    },
    pickerDark: {
        height: 50,
        width: "100%",
        borderWidth: 1,
       
        borderBlockColor: 'white',
        borderRadius: 5,
    }
});
