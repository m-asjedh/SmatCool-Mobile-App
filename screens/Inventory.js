import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import CustomModal from "../components/CustomModal";
import Button from "../components/Button";

const Inventory = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const [listNumber, setListNumber] = useState(1);
  const [listDate, setListDate] = useState(new Date().toLocaleDateString());

  const products = [
    { id: "1", name: "Product 1", quantity: 10 },
    { id: "2", name: "Product 2", quantity: 10 },
    { id: "3", name: "Product 3", quantity: 10 },
    { id: "4", name: "Product 4", quantity: 10 },
  ];

  const handleAddProduct = (productName) => {
    setSelectedProduct(productName);
    setModalVisible(true);
  };

  const handleConfirmAdd = (quantity) => {
    const newList = {
      id: listNumber,
      products: [{ name: selectedProduct, quantity }],
    };
    setNewlyAddedProducts((prevLists) => [...prevLists, newList]);
    setListNumber(listNumber + 1);
    setModalVisible(false);
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
        {item.quantity}
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
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS.black,
              marginBottom: 10,
            }}
          >
            Create Shopping List
          </Text>
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
                        name="trash-outline"
                        size={24}
                        color={COLORS.red}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        <Button
          title="Create"
          style={{
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("ShoppingList")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: 50,
          padding: 20,
        }}
      >
        <Image
          source={require("../assets/welcom1.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            transform: [{ rotate: "-15deg" }],
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

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmAdd}
        productName={selectedProduct}
      />
    </LinearGradient>
  );
};

export default Inventory;
