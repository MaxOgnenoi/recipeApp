import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";
import { CashedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  return (
    <ScrollView
      className="bg=white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      {/* recipe image */}
      <View className="flex-row justify-center">
        <CashedImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRaduius: 40,
            borderBottomRightRaduius: 40,
            marginTop: 4,
          }}
        />
      </View>
    </ScrollView>
  );
}
