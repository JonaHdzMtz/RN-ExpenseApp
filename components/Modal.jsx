import { View, Text, Modal, TouchableHighlight, Pressable } from "react-native";
import { CreateContext } from "../context/ContextProvider";
import { useContext } from "react";
export const CustomModal = ({ message, showModal, setShowModal }) => {
  const { theme } = useContext(CreateContext);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
      statusBarTranslucent={true}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            height: 200,
            backgroundColor: theme.backgroundColor,
            borderRadius: 10,
            boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.25)",
            padding: 20,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              color: theme.color,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {message}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Pressable
            onPress={() => {setShowModal(false)}}
              style={({ pressed }) => [
                {
                  backgroundColor: "#ee676b",
                  borderRadius: 10,
                  padding: 10,
                  boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25)",
                  opacity: pressed ? 0.5 : 1,
                  transform: [
                    {
                      scale: pressed ? 1.1 : 1,
                    },
                  ],
                },
              ]}
            >
              <Text style={{ fontSize: 18  }}>Cancelar</Text>
            </Pressable>
            <Pressable
            opPress={() => {}}
              style={({ pressed }) => [
                {
                  backgroundColor: theme.secondary,
                  borderRadius: 10,
                  padding: 10,
                  boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25)",
                  opacity: pressed ? 0.5 : 1,
                  transform: [
                    {
                      scale: pressed ? 1.1 : 1,
                    },
                  ],
                },
              ]}
            >
              <Text style={{ fontSize: 18, }}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
