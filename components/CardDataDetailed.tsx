import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { CreateContext } from "../context/ContextProvider";
import React, { useContext, useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useFonts } from "expo-font";

interface infoCard {
  idExpense: string;
  title: string;
  price: number;
  date: string;
  picture?: string;
  category: string;
}

export const CardDataDetailed = (props: infoCard) => {
  const { theme } = useContext(CreateContext);
  const { width, height } = Dimensions.get("window");

  //   useEffect(() => {
  //     console.log(props);
  //   }
  //     , []);

  const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      color: theme.color,
      marginBottom: 5,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: width * 0.8,
          height: 250,
          padding: 10,
          justifyContent: "space-between",

          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          backgroundColor: theme.backgroundColor,
          borderWidth: 1,
          borderColor: theme.primary,
          boxShadow: "0 1 5 2 rgba(0,0,0,0.1)",
        }}
      >
        {props.picture ? (
          <Image
            style={{
              width: width * 0.73,
              height: 100,
              borderRadius: 10,
              alignSelf: "center",
            }}
            source={{ uri: `data:image/jpg;base64,${props.picture}` }}
          />
        ) : (
          <FontAwesome6
            style={{ alignSelf: "center" }}
            name="file-invoice-dollar"
            size={90}
            color={theme.name === "dark" ? "white" : "black"}
          />
        )}
        <View
          style={{
            flex: 1,
            margin: 5,
       
            backgroundColor: theme.primary,
       
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 5,
          }}
        >
          <Text style={styles.text}>{`Gasto: ${props.title}`}</Text>
          <Text style={styles.text}>{`Precio: $${props.price}`}</Text>
          <Text style={styles.text}>{`Fecha: ${props.date}`}</Text>
          <Text style={styles.text}>{`Categoria: ${props.category}`}</Text>
        </View>
      </View>
    </Pressable>
  );
};
