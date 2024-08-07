import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import COLORS from "../constants/colors";

const CustomModal = ({ visible, onClose, onConfirm, productName }) => {
  const [quantity, setQuantity] = useState("1");

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity("1");
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: COLORS.white,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: COLORS.black,
            }}
          >
            Add Product
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
              color: COLORS.black,
            }}
          >
            Do you want to add {productName} to the list?
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, marginRight: 10 }}>Quantity:</Text>
            <TextInput
              style={{
                height: 40,
                width: 60,
                borderColor: "gray",
                borderWidth: 1,
                paddingHorizontal: 10,
                marginBottom: 10,
              }}
              onChangeText={(text) => setQuantity(text)}
              value={quantity}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 10,
                margin: 5,
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={handleConfirm}
            >
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 10,
                margin: 5,
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={onClose}
            >
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
