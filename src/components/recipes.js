import React from "react";
import { View, Text, Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import Animated, {FadeInDown} from "react-native-reanimated";
import Loading from "./loading";
import { CashedImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: wp(4), marginBottom: hp(3) }}>
      <Text style={{ fontSize: hp(3), fontWeight: "600", color: "#333" }}>
        Recipes
      </Text>
      <View style={{ marginTop: hp(1.5) }}>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" style={{ marginTop: hp(20) }} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RecipeCard item={item} index={index} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
      style={{
        paddingLeft: isEven ? 0 : wp(2),
        paddingRight: isEven ? wp(2) : 0,
      }}
    >
      <Pressable
        style={{ alignItems: "center", marginBottom: hp(2) }}
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <CashedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: hp(2),
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          }}
          sharedTransitionTag={item.strMeal}
        />
        <Text style={{ fontSize: hp(1.5), color: "#333", marginTop: hp(1) }}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
