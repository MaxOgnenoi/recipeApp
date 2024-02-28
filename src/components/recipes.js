import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { CashedImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 4, marginTop: 10, marginBottom: 20 }}>
      <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "#333" }}>
        Recipes
      </Text>
      <View>
        {!categories ||
        !meals ||
        categories.length == 0 ||
        meals.length == 0 ? (
          <Loading size="large" style={{ marginTop: 20 }} />
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
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      style={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingHorizontal: isEven ? 0 : 8,
          paddingVertical: 8,
        }}
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        />
        <Text
          style={{
            fontSize: hp(1.5),
            fontWeight: "bold",
            color: "#333",
            marginLeft: 2,
          }}
        >
          {item.strMeal && item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
