import { Text, View, Pressable, Modal, Alert } from "react-native";
import { useContext, useState, useEffect } from "react";
import { CreateContext } from "../../context/ContextProvider";
import { CustomModal } from "../../components/Modal";
import {ModalSelectCard} from "../../components/ModalSelectCard";
export const Settings = ({ navigation, route }) => {
  const { theme } = useContext(CreateContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSelectCardModal, setShowSelectCardModal] = useState(false);
  const showDialog = () => {
    Alert.alert(
      "Detalles de la app",
      "aplicación creada por JonaHdzMtz(Github). \nEn caso de algun error o sugerencia, favor de contactar al desarrollador :D",
      [
        {
          text: "Cerrar",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        }
       
      ],
      {
        onDismiss: () => console.log("onDismiss"),
        cancelable: true,
        userInterfaceStyle: theme.backgroundColor,
      }
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        paddingTop: 10,
        paddingHorizontal:15,
        gap: 10,
      }}
    >
      <CustomModal
        message={"Está por borrar los datos permanentemente. Está seguro?"}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
      <ModalSelectCard
        message={"Seleccione el tipo de tarjeta a mostrar"}
        showModal={showSelectCardModal}
        setShowModal={setShowSelectCardModal}
      />
      <Pressable
        onPress={() => {
          setShowDeleteModal(true);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.secondary : null,
          },
          {
            borderBottomWidth: 1,
            borderBottomColor: theme.primary,
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
      <Pressable
        onPress={() => {
          setShowSelectCardModal(true);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.secondary : null,
          },
          {
            borderBottomWidth: 1,
            borderBottomColor: theme.primary,
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
          seleccionar tipo de Card
        </Text>
      </Pressable>
      <Pressable
        onPress={showDialog}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.secondary : null,
          },
          {
            borderBottomWidth: 1,
            borderBottomColor: theme.primary,
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
          Información de la app
        </Text>
      </Pressable>
    </View>
  );
};
