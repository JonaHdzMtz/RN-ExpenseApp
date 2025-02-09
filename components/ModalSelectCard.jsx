import React from "react";
import {
  Image,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CreateContext } from "../context/ContextProvider";
import { useContext } from "react";
import { CardData } from "./CardData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ModalSelectCard = ({ message, showModal, setShowModal }) => {
  const { theme, setCardType } = useContext(CreateContext);
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      color: theme.color,
      textAlign: "center",
    },
    text: {
      fontSize: 20,
      color: theme.color,
      textAlign: "center",
    },
  });

  const handleSelectCardType = (type) => {
    setCardType(type);
    AsyncStorage.setItem("cardType", type).catch((error) => {
      console.log(error);
    });
    setShowModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
      statusBarTranslucent={true}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.backgroundColor,
            paddingTop: insets.top,
            gap: 20,
            paddingBottom: 40,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 25,
              color: theme.color,
              textAlign: "center",
            }}
          >
            Selecciona el tipo de tarjeta que deseas ver en el historia de
            gastos:
          </Text>
          <View style={{ height: 20 }}></View>
          <Pressable
            onPress={() => handleSelectCardType("rectangleCard")}
            style={({ pressed }) => [
              {
                width: "93%",
                transform: [{ scale: pressed ? 1.02 : 1 }],
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 10,
                gap: 20,
                height: 400,
                borderRadius: 10,
                boxShadow: "0px 0px 10px 0px rgba(0,0,0, 0.25)",
                borderWidth: 2,
                borderColor: theme.secondary,
              }}
            >
              <Text style={styles.title}>Opcion 1</Text>
              <Text style={styles.text}>
                De acuerdo a la categoria, se muestra una banda de color
                diferente(lado derecho)
              </Text>

              <View
                style={{
                  height: 120,
                  width: "95%",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: theme.secondary,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: 75,
                    borderRightWidth: 1,
                    borderColor: theme.secondary,
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text>Imagen</Text>
                </View>
                <View style={{ flex: 1, padding: 10, gap: 10 }}>
                  <Text>Titulo: Pasaje</Text>
                  <Text>Precio: $200</Text>
                  <Text>Fecha: 02/12/2024 (MM/DD/YYYY)</Text>
                  <Text>Categoria: Transporte</Text>
                </View>
                <View
                  style={{
                    height: "100%",
                    width: 15,
                    backgroundColor: "red",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => handleSelectCardType("boxCard")}
            style={({ pressed }) => [
              {
                width: "93%",
                transform: [{ scale: pressed ? 1.02 : 1 }],
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 10,
                gap: 20,
                height: 400,
                borderRadius: 10,
                boxShadow: "0px 0px 10px 0px rgba(0,0,0, 0.25)",
                borderWidth: 2,
                borderColor: theme.secondary,
              }}
            >
              <Text style={styles.title}>Opcion 2</Text>
              <View
                style={{
                  backgroundColor: theme.backgroundColor,
                  height: 300,
                  width: "80%",
                  borderRadius: 10,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: theme.secondary,

                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    height: 110,
                    width: 100,
                    borderWidth: 1,
                    borderColor: theme.primary,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: theme.color }}>Imagen</Text>
                </View>

                <View
                  style={{
                    width: "95%",
                    height: 170,
                    borderWidth: 1,
                    borderColor: theme.secondary,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <View style={{ padding: 10, gap: 10 }}>
                    <Text
                      style={{ color: theme.color }}
                    >{`Gasto: Pasaje`}</Text>
                    <Text style={{ color: theme.color }}>{`Precio: $200`}</Text>
                    <Text
                      style={{ color: theme.color }}
                    >{`Fecha: 02/12/2024 (MM/DD/YYYY)`}</Text>
                    <Text
                      style={{ color: theme.color }}
                    >{`Categoria: Transporte`}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};
