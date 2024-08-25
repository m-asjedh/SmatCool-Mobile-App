import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import axios from "axios";

const ShoppingList = ({ navigation }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const [editedItems, setEditedItems] = useState([]);

  // Function to fetch shopping lists from the backend
  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:3000/api/shopping-lists"
        );
        console.log("API Response:", response.data);
        setShoppingLists(response.data);
      } catch (error) {
        console.error("Error fetching shopping lists:", error);
        Alert.alert("Error", "Failed to fetch shopping lists.");
      }
    };

    fetchShoppingLists();
  }, []);

  const toggleExpand = (itemId) => {
    setExpandedId((prevId) => (prevId === itemId ? null : itemId));
  };

  // Function to delete shopping lists from the backend
  const handleDelete = (itemId) => {
    Alert.alert(
      "Delete Shopping List",
      "Are you sure you want to delete this shopping list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(
                `http://10.0.2.2:3000/api/shopping-lists/${itemId}`
              );
              setShoppingLists((prevLists) =>
                prevLists.filter((list) => list._id !== itemId)
              );
              Alert.alert("Success", "Shopping list deleted successfully.");
            } catch (error) {
              console.error("Error deleting shopping list:", error);
              Alert.alert("Error", "Failed to delete shopping list.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEdit = (list) => {
    setCurrentList(list);
    setEditedItems(list.items);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://10.0.2.2:3000/api/shopping-lists/${currentList._id}/items`,
        {
          items: editedItems,
        }
      );
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === currentList._id ? { ...list, items: editedItems } : list
        )
      );
      setModalVisible(false);
      Alert.alert("Success", "Shopping list updated successfully.");
    } catch (error) {
      console.error("Error updating shopping list:", error);
      Alert.alert("Error", "Failed to update shopping list.");
    }
  };

  const handleEditItem = (index, newQuantity) => {
    const quantity = parseInt(newQuantity);

    const updatedItems = [...editedItems];

    if (!isNaN(quantity)) {
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: quantity,
      };
    } else {
      // Handle invalid or empty input here, e.g., setting quantity to 0 or leaving unchanged
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: 0, // or you can use '' if you want to keep it empty
      };
    }

    setEditedItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = editedItems.filter((_, i) => i !== index);
    setEditedItems(updatedItems);
  };

  const renderItem = ({ item }) => {
    if (!item || !item._id) {
      return null;
    }

    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 15,
          borderRadius: 10,
          marginVertical: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.lightGray,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => toggleExpand(item._id)}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontSize: 16 }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <Ionicons
            name={expandedId === item._id ? "chevron-up" : "chevron-down"}
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        {expandedId === item._id && (
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            {item.items.map((product, index) => (
              <View
                key={product._id}
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ flex: 1, fontSize: 20 }}>{product.name}</Text>
                <Text style={{ fontSize: 20 }}>{product.quantity}</Text>
              </View>
            ))}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => handleDelete(item._id)}
              >
                <Ionicons name="trash-bin" size={24} color={COLORS.red} />
                <Text
                  style={{ fontSize: 20, color: COLORS.red, marginLeft: 5 }}
                >
                  Delete List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => handleEdit(item)}
              >
                <Ionicons name="pencil" size={24} color={COLORS.black} />
                <Text
                  style={{ fontSize: 20, color: COLORS.black, marginLeft: 5 }}
                >
                  Edit List
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 70, left: 20 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: COLORS.black,
            marginTop: 90,
          }}
        >
          Shopping Lists
        </Text>

        <FlatList
          data={shoppingLists}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View
          style={{
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

      {/* Modal for Editing Shopping List */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Edit List
            </Text>
            <ScrollView>
              {editedItems.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightGray,
                    paddingBottom: 5,
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 16 }}>{item.name}</Text>
                  <TextInput
                    style={{
                      flex: 1,
                      textAlign: "center",
                      marginRight: 10,
                    }}
                    keyboardType="numeric"
                    value={item.quantity.toString()}
                    onChangeText={(text) => handleEditItem(index, text.trim())}
                  />

                  <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                    <Ionicons name="trash-bin" size={24} color={COLORS.red} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <Button
              title="Update List"
              onPress={handleUpdate}
              color={COLORS.primary}
            />
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color={COLORS.lightGray}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default ShoppingList;
