import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";

export default function RecipeDetailScreen(props) {
  let item = props.route.param;
  return (
    <ScrollView
      className="bg=white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
    </ScrollView>
  );
}
