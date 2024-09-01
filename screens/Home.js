import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.137.131:8080/api/temperature"
        );
        console.log("API Response:", response.data); // Log the response
        const { temperature, humidity } = response.data;

        setTemperature(temperature);
        setHumidity(humidity);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 60000); // Fetch every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.white} />
        ) : (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 120,
                  fontWeight: "bold",
                  color: COLORS.white,
                  marginTop: 120,
                }}
              >
                {temperature ? `${temperature}°C` : "N/A"}
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                Average
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: COLORS.white,
                  marginVertical: 10,
                }}
              >
                Humidity: {humidity ? `${humidity}%` : "N/A"}
              </Text>
              <View
                style={{
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  width: "100%",
                  margin: 20,
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
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default Home;
