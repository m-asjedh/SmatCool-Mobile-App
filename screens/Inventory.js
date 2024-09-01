import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import axios from "axios";

// Define the weight of each product
const PRODUCT_WEIGHT = {
  "Product 1": 50,
  "Product 2": 30,
};

const Inventory = () => {
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const [listNumber, setListNumber] = useState(1);
  const [listDate, setListDate] = useState(new Date().toLocaleDateString());
  const [modalVisible, setModalVisible] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");
  const [listName, setListName] = useState("");
  const [productQuantities, setProductQuantities] = useState({});

  const products = [
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
  ];

  const handleAddProduct = (productName) => {
    setSelectedProduct(productName);
    setModalVisible(true);
  };

  const handleConfirmAdd = (quantity) => {
    const parsedQuantity = parseInt(quantity) || 0;
    if (!parsedQuantity) {
      Alert.alert("Invalid Input", "Please enter a valid quantity.");
      return;
    }

    const newList = {
      id: listNumber,
      date: listDate,
      products: [{ name: selectedProduct, quantity: parsedQuantity }],
    };

    const existingList = newlyAddedProducts.find(
      (list) => list.id === listNumber
    );

    if (existingList) {
      existingList.products.push({
        name: selectedProduct,
        quantity: parsedQuantity,
      });
      setNewlyAddedProducts([...newlyAddedProducts]);
    } else {
      setNewlyAddedProducts((prevLists) => [...prevLists, newList]);
    }

    setModalVisible(false);
    setQuantityInput("");
  };

  const handleDeleteProduct = (listId, productName) => {
    const updatedLists = newlyAddedProducts.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          products: list.products.filter(
            (product) => product.name !== productName
          ),
        };
      }
      return list;
    });
    setNewlyAddedProducts(updatedLists);
  };

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const response = await axios.get(
          "http://192.168.137.131:8080/api/weights/"
        );
        const { quantity1, quantity2 } = response.data;

        setProductQuantities({
          "Product 1": quantity1,
          "Product 2": quantity2,
        });
      } catch (error) {
        console.error("Error fetching weights:", error);
        Alert.alert("Error", "Failed to fetch weight data.");
      }
    };

    fetchWeights(); // Initial fetch

    const intervalId = setInterval(fetchWeights, 10000); // Fetch every 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        paddingVertical: 10,
      }}
    >
      <Text style={{ flex: 1, fontSize: 18, color: COLORS.black }}>
        {item.name}
      </Text>
      <Text style={{ flex: 1, fontSize: 18, color: COLORS.black }}>
        {productQuantities[item.name] || 0}
      </Text>
      <TouchableOpacity onPress={() => handleAddProduct(item.name)}>
        <Ionicons name="add-circle" size={28} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 70, left: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: COLORS.black,
            marginTop: 90,
          }}
        >
          Inventory
        </Text>

        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.black,
            paddingBottom: 10,
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            Product
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            Quantity
          </Text>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: COLORS.black }}
          >
            Action
          </Text>
        </View>

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        {/* Newly Added Products Section */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            Create Shopping List
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: COLORS.black,
              borderWidth: 1,
              marginBottom: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: "white",
            }}
            placeholder="Enter list name"
            value={listName}
            onChangeText={setListName}
          />
          <ScrollView
            style={{
              maxHeight: 200,
            }}
            contentContainerStyle={{
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: COLORS.black }}
            >
              Date: {listDate}
            </Text>

            {newlyAddedProducts.map((list) => (
              <View key={list.id}>
                {list.products.map((product, productIndex) => (
                  <View
                    key={productIndex}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.lightGray,
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        color: COLORS.black,
                      }}
                    >
                      {product.name}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        color: COLORS.black,
                      }}
                    >
                      Qty: {product.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteProduct(list.id, product.name)}
                    >
                      <Ionicons
                        name="remove-circle"
                        size={28}
                        color={COLORS.red}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          <Button
            style={{ marginTop: 15 }}
            title="Submit List"
            onPress={async () => {
              if (!listName) {
                Alert.alert(
                  "Missing Information",
                  "Please enter a name for the shopping list."
                );
                return;
              }

              try {
                await axios.post(`http://10.0.2.2:3000/api/shopping-lists`, {
                  name: listName,
                  items: newlyAddedProducts.flatMap((list) => list.products),
                });
                Alert.alert("Success", "Shopping list submitted successfully!");
                setListName("");
                setNewlyAddedProducts([]);
              } catch (error) {
                console.error("Error submitting list:", error);
                Alert.alert("Error", "Failed to submit the shopping list.");
              }
            }}
          />
        </View>

        {/* Add Product Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
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
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: COLORS.black,
                }}
              >
                Enter Quantity
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  width: "100%",
                }}
                keyboardType="numeric"
                placeholder="Enter quantity"
                value={quantityInput}
                onChangeText={setQuantityInput}
              />
              <Button
                title="Confirm"
                onPress={() => handleConfirmAdd(quantityInput)}
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color={COLORS.red}
              />
            </View>
          </View>
        </Modal>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Image
            source={require("../assets/welcom1.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              transform: [{ rotate: "15deg" }],
            }}
          />
          <Image
            source={require("../assets/welcome2.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              transform: [{ rotate: "0deg" }],
            }}
          />
          <Image
            source={require("../assets/welcome3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              transform: [{ rotate: "15deg" }],
            }}
          />
          <Image
            source={require("../assets/welcom4.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              transform: [{ rotate: "-15deg" }],
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Inventory;
