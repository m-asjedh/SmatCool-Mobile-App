import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import axios from "axios";

const formatDateTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:3000/api/notifications"
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        Alert.alert("Error", "Failed to load notifications.");
      }
    };

    fetchNotifications();
  }, []);

  // Delete a notification from the DB API
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/api/notifications/${id}`);

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      Alert.alert("Error", "Failed to delete the notification.");
    }
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
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, color: COLORS.black }}>
          {item.message}
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.gray, marginTop: 5 }}>
          {formatDateTime(item.createdAt)}{" "}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteNotification(item._id)}>
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
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            marginTop: 30,
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

export default Notifications;
