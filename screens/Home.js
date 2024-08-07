import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 70, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color={COLORS.black} />
      </TouchableOpacity>

      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ position: "absolute", top: 70, right: 20 }}>
          <Text
            style={{ fontSize: 18, color: COLORS.black, fontWeight: "bold" }}
          >
            CONNECTED
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: COLORS.white,
              marginTop: 120,
            }}
          >
            34°C
          </Text>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", color: COLORS.white }}
          >
            Average
          </Text>
          <View
            style={{
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              width: "100%",
              marginVertical: 20,
            }}
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <Button
            title="Notifications"
            style={{
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("Notifications")}
          />
          <Button
            title="Open Inventory"
            style={{
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("Inventory")}
          />
          <Button
            title="View Shopping Lists"
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

export default Home;
