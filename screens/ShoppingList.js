import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const ShoppingList = ({ navigation }) => {
  const navigate = useNavigation();
  const [expandedId, setExpandedId] = useState(null);
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      number: 1,
      date: "2024-06-22",
      products: [
        { name: "Product A", quantity: 2 },
        { name: "Product B", quantity: 1 },
        { name: "Product C", quantity: 3 },
      ],
    },
    {
      id: 2,
      number: 2,
      date: "2024-06-23",
      products: [
        { name: "Product X", quantity: 5 },
        { name: "Product Y", quantity: 2 },
        { name: "Product Z", quantity: 4 },
      ],
    },
    {
      id: 3,
      number: 3,
      date: "2024-06-24",
      products: [
        { name: "Product P", quantity: 1 },
        { name: "Product Q", quantity: 2 },
        { name: "Product R", quantity: 3 },
      ],
    },
  ]);

  const toggleExpand = (itemId) => {
    setExpandedId((prevId) => (prevId === itemId ? null : itemId));
  };

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
          onPress: () => {
            setShoppingLists((prevLists) =>
              prevLists.filter((list) => list.id !== itemId)
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
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
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          List {item.number}
        </Text>
        <Text style={{ fontSize: 20 }}>{item.date}</Text>
        <Ionicons
          name={expandedId === item.id ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.black}
        />
      </TouchableOpacity>

      {expandedId === item.id && (
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          {item.products.map((product, index) => (
            <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ flex: 1, fontSize: 20 }}>{product.name}</Text>
              <Text style={{ fontSize: 20 }}>{product.quantity}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-bin" size={24} color={COLORS.red} />
            <Text style={{ fontSize: 20, color: COLORS.red, marginLeft: 5 }}>
              Delete List
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: 50,
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
      </View>
    </LinearGradient>
  );
};

export default ShoppingList;
