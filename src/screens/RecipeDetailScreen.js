import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CashedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "vue-feather-icons/outline";
import { HeartIcon } from "vue-feather-icons/solid";

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
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity className="p-2 rounded-full ml-5 ng-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 rounded-full mr-5 ng-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color="grey" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
