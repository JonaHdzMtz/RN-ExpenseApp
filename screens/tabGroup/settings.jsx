import { Text, View, Pressable, Modal, Alert } from "react-native";
import { useContext, useState, useEffect } from "react";
import { CreateContext } from "../../context/ContextProvider";
import { CustomModal } from "../../components/Modal";
export const Settings = ({ navigation, route }) => {
  const { theme } = useContext(CreateContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showDialog = () => {
    Alert.alert(
        "Borrar datos",
        "Está por borrar todos los datos, esta seguro?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "destructive"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        {
            onDismiss: () => console.log("onDismiss"),
            cancelable: true,
            userInterfaceStyle : theme.backgroundColor
        }
    )
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        paddingTop: 10,
      }}
    >
        <CustomModal message={"Está por borrar los datos permanentemente. Está seguro?"} showModal ={showDeleteModal} setShowModal={setShowDeleteModal} />
      <Pressable
        onPress={()=>{setShowDeleteModal(true)}}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.secondary : null,
          },
          {
            borderBottomWidth: 1,
            borderBottomColor: theme.color,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 19,
            paddingHorizontal: 10,
            paddingVertical: 10,
            color: theme.color,
          }}
        >
          Borrar datos
        </Text>
      </Pressable>
    </View>
  );
};
