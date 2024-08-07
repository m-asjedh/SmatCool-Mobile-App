import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Product 1 is going to finish soon." },
    { id: 2, message: "Product 2 is going to finish soon." },
    { id: 3, message: "The temperature has dropped by 10 degrees." },
  ]);

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 18, color: COLORS.black, flex: 1 }}>
        {item.message}
      </Text>
      <TouchableOpacity onPress={() => deleteNotification(item.id)}>
        <Ionicons name="trash-outline" size={24} color={COLORS.red} />
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
          Notifications
        </Text>

        <View style={{ marginTop: 20, flex: 1 }}>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
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

export default Notifications;
