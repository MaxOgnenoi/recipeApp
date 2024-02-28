import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    <Animated.View style={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{ alignItems: "center", marginRight: 4 }}
            >
              <View style={[{ borderRadius: 999, padding: 6 }, activeButtonClass]}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: 48, height: 48, borderRadius: 24 }}
                />
              </View>
              <Text style={{ fontSize: 12, color: "#333" }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
