import React from "react";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, marginTop: 50 }}>
        <View>
          <Image
            source={require("../assets/welcom1.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/welcome2.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/welcome3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/welcom4.jpg")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
          <View
            style={{
              paddingHorizontal: 22,
              position: "absolute",
              top: 400,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: 800,

                color: COLORS.white,
              }}
            >
              Smart Cool
            </Text>

            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.white,
                  marginVertical: 4,
                }}
              >
                Get started to manage
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.white,
                  marginVertical: 4,
                }}
              >
                your refigerator here
              </Text>
              <Button
                title="Start"
                onPress={() => navigation.navigate("Home")}
                style={{
                  marginTop: 80,
                  width: "100%",
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
