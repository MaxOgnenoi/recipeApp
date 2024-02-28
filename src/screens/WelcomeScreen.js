import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f59e0b",
      }}
    >
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 999,
          padding: ring2padding,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 999,
            padding: ring1padding,
          }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={{ alignItems: "center", marginTop: hp(4) }}>
        <Text
          style={{
            fontSize: hp(7),
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: 2,
          }}
        >
          Foody
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: "medium",
            color: "#fff",
            letterSpacing: 2,
          }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}
