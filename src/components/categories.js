import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  const fadeInDown = useSharedValue(0);

  fadeInDown.value = withSpring(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInDown.value,
      transform: [
        {
          translateY: fadeInDown.value * 20,
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonStyle = isActive
            ? { backgroundColor: "#f59e0b" }
            : { backgroundColor: "rgba(0, 0, 0, 0.1)" };
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
                padding: 8,
                borderRadius: 20,
                ...activeButtonStyle,
              }}
            >
              {/* Assuming CashedImage is an external component */}
              {/* <CashedImage
                uri={cat.strCategoryThumb}
                style={{ width: hp(6), height: hp(6), borderRadius: hp(3) }}
              /> */}
              <View
                style={{
                  width: hp(6),
                  height: hp(6),
                  borderRadius: hp(3),
                  backgroundColor: "gray", // Placeholder for image
                  marginRight: 8,
                }}
              />
              <Text style={{ fontSize: hp(1.6), color: "#333" }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
