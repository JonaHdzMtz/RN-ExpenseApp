import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  Pressable,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect, useRef, useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Picker } from "@react-native-picker/picker";
import {
  insertExpense,
  getItemExpense,
  updateItemExpense,
  deleteItemExpense,
} from "../../service/ExpenseService";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { CreateContext } from "../../context/ContextProvider";

const { width, height } = Dimensions.get("window");

export const AddData = ({ navigation, route }) => {
  const { theme } = useContext(CreateContext);
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
      getItemExpense(idExpense).then((result) => {
        console.log("result", result);

        setTitle(result.title);
        setDescription(result.description);
        setCategory(result.category);
        setPrice(result.price.toString());
        setBase64(result.picture);
      });
    }
  }, [updateData]);

  useEffect(() => {
    if (permission !== null && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  //CAMBIAR EL HEADER
  // useEffect(() => {
  //     if (openCamera) {
  //         navigation.setOptions({
  //             tabBarStyle: { display: 'none' },
  //             headerTitle: "Toma la foto",
  //             tabBarStyle :{
  //                 backgroundColor : theme.backgroundColor
  //             }
  //         });
  //     } else {
  //         navigation.setOptions({
  //             headerTitle: "Agregar",
  //             tabBarStyle: { display: 'flex' },
  //             tabBarStyle :{
  //                 backgroundColor : theme.backgroundColor
  //             }
  //         });
  //     }

  // }, [openCamera]);

  const handleValidatePrice = (value) => {
    const number = parseFloat(value); // Convertir a número
    const isValidNumber = /^\d*\.?\d*$/.test(number);
    if (value === "") {
      setPrice(""); // Restablecer a "0" si está vacío
    } else if (!isNaN(number) && isValidNumber) {
      // no funciona el isValidNumber
      setPrice(value); // Mantener el valor ingresado si es válido
    } else {
      Alert.alert("Error", "Solo se permiten números"); // Mostrar alerta
      setPrice(""); // Restablecer a "0" si el valor es inválido
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
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setCategory("alimentos");
    setPrice("");
    setBase64("");
  };

  const validateUpdateSave = () => {
    console.log("validate");
    if (updateData !== undefined) {
      handleUpdateData();
    } else {
      handleSaveData();
    }
  };

  const handleUpdateData = () => {
    alert("actualizando");
    const item = {
      idExpense: idExpense,
      title: title,
      description: description,
      category: category,
      price: price,
      picture: base64,
    };
    updateItemExpense(item).then((result) => {
      if (result.changes > 0) {
        alert("Se ha actualizado correctamente");
        resetFields();
        navigation.navigate("tabGroup");
      } else {
        alert("No se ha podido actualizar");
      }
    });
  };

  const handleSaveData = async () => {
    console.log("guardando");
    const date = new Date();
    const newItem = {
      title: title,
      description: description,
      date: date.toLocaleDateString(),
      category: category,
      price: price,
      picture: base64,
    };
    const result = await insertExpense(newItem);
    console.log("result", result.changes);
    if (result.changes > 0) {
      Alert.alert("Guardado", "El producto ha sido guardado correctamente");
      navigation.navigate("Historial");
      resetFields();
    } else {
      Alert.alert("Error", "No se ha podido guardar el producto");
    }
  };

  const handleDeleteExpenseItem = () => {
    deleteItemExpense(idExpense)
      .then((result) => {
        if (result.changes > 0) {
          alert("Se ha eliminado correctamente");
          resetFields();
          navigation.navigate("tabGroup");
        } else {
          alert("No se ha podido eliminar");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={{ height: Dimensions }}>
      {openCamera === false && (
        <View
          style={[styles.container, { backgroundColor: theme.backgroundColor }]}
        >
          <Text style={[styles.text, { color: theme.color }]}>
            Producto/Servicio:
          </Text>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.color,
                  borderColor: theme.color,
                  backgroundColor: theme.primary,
                },
              ]}
              placeholder="luz eléctrica"
              placeholderTextColor={theme.secondary}
              value={title}
              onChangeText={setTitle} // Actualizar directamente el estado de producto
            />
            {title.length === 0 && (
              <Text style={styles.label}>obligatorio</Text>
            )}
          </View>
          <Text style={[styles.text, { color: theme.color }]}>
            Costo (MXN):
          </Text>
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.color,
                  borderColor: theme.color,
                  backgroundColor: theme.primary,
                },
              ]}
              placeholder="$0.00"
              placeholderTextColor={theme.secondary}
              keyboardType="numeric"
              value={price} // Mostrar el valor como cadena
              onChangeText={setPrice} // Validar la entrada de precio
            />
            {price.length === 0 && (
              <Text style={[styles.label]}>obligatorio</Text>
            )}
          </View>

          <Text style={[styles.text, { color: theme.color }]}>Categoria:</Text>
          <View
            style={[
              styles.picker,
              { borderColor: theme.color, backgroundColor: theme.primary },
            ]}
          >
            <Picker
              style={{ color: theme.color }}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              <Picker.Item label="Alimentos" value="alimentos" />
              <Picker.Item label="Servicios" value="servicios" />
              <Picker.Item label="Transporte" value="transporte" />
              <Picker.Item label="Salud" value="salud" />
              <Picker.Item label="Educación" value="educación" />
            </Picker>
          </View>

          <Text style={[styles.text, { color: theme.color }]}>
            Descripcion(opcional):
          </Text>
          <TextInput
            style={[
              styles.inputDescription,
              {
                borderColor: theme.color,
                color: theme.color,
                backgroundColor: theme.primary,
              },
            ]}
            placeholder="Descripción del producto/servicio"
            placeholderTextColor={theme.secondary}
            numberOfLines={4}
            maxLength={200}
            value={description}
            onChangeText={setDescription}
          />
          {base64 !== "" && (
            <Image
              style={styles.image}
              source={{ uri: `data:image/jpg;base64,${base64}` }}
            ></Image>
          )}

          <View style={styles.containerButtons}>
            <Pressable
              style={[
                styles.pressableCamera,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => setOpenCamera(true)}
            >
              <AntDesign name="camerao" size={50} color={theme.color} />
            </Pressable>
            <Pressable
              disabled={!price.length > 0 || !title.length > 0}
              style={({pressed})=>[
                styles.saveButton,
                {
                  backgroundColor:
                    !price.length > 0 || !title.length > 0
                      ? "#ee676b"
                      : theme.secondary,
                  opacity: !price.length > 0 || !title.length > 0 ? 0.5 : 1,
                  transform : [{
                        scale : pressed ? 1.1 : 1
                  }]
                },
              ]}
              onPress={validateUpdateSave}
            >
              <Text style={[styles.textButton, { color: theme.color }]}>
                {updateData !== undefined ? "Actualizar" : "Guardar"}
              </Text>
            </Pressable>
            {updateData !== undefined && (
              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  {
                    backgroundColor: "#ee676b",
                    opacity: pressed ? 0.5 : 1,
                    transform : [{
                        scale : pressed ? 1.1 : 1
                    }]
                  },
                ]}
                onPress={handleDeleteExpenseItem}
              >
                <Text style={[styles.textButton, { color: theme.color }]}>
                  Eliminar
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      )}

      {openCamera && permission && permission.granted && (
        <View style={{ height: height * 0.9 }}>
          <CameraView style={{ flex: 1 }} ref={pictureRef}>
            <View style={styles.buttonContainer}></View>
          </CameraView>

          <Pressable style={styles.takePhotoButton} onPress={takePicture}>
            <EvilIcons name="camera" size={24} color="black" />
          </Pressable>

          <Pressable
            style={styles.backPhotoButton}
            onPress={() => setOpenCamera(!openCamera)}
          >
            <AntDesign name="back" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 10,
  },

  text: {
    fontSize: 15,
    fontWeight: "bold",
  },

  input: {
    height: 40,

    borderRadius: 5,
    paddingLeft: 10,
  },
  inputDescription: {
    textAlignVertical: "top",
    height: 100,

    borderRadius: 5,
    paddingLeft: 10,
  },
  image: {
    height: 200,
    objectFit: "contain",
    borderRadius: 10,
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
    backfaceVisibility: "hidden",
  },
  pressableCamera: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
  },
  containerButtons: {
    alignItems: "center",
    gap: 15,
  },
  saveButton: {
    height: 50,
    width: "60%",
    borderRadius: 10,
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  takePhotoButton: {
    position: "absolute",
    bottom: 50,
    right: 50,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
  },
  backPhotoButton: {
    position: "absolute",
    bottom: 50,
    left: 50,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
  },
  label: {
    color: "#ee676b",
  },
  picker: {
    height: 50,
    width: "100%",
    borderRadius: 5,
  },
});
