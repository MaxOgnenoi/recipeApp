import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { CachedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  HeartIcon,
  ClockIcon,
  UsersIcon,
  FireIcon,
} from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      {/* recipe image */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
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
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 140,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 10,
            borderRadius: 999,
            marginLeft: 10,
            backgroundColor: "white",
          }}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          style={{
            padding: 10,
            borderRadius: 999,
            marginRight: 10,
            backgroundColor: "white",
          }}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "grey"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {loading ? (
        <Loading size="large" style={{ marginTop: 160 }} />
      ) : (
        <View style={{ paddingHorizontal: 8, paddingBottom: 30 }}>
          {/* name and area */}
          <Animated.View style={{ marginTop: 16 }}>
            <Text
              style={{ fontSize: hp(3), fontWeight: "bold", color: "#333" }}
            >
              {meal?.strMeal}
            </Text>
            <Text style={{ fontSize: hp(2), color: "#555" }}>
              {meal?.strArea}
            </Text>
          </Animated.View>

          {/* misc */}
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                >
                  35
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Mins
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                >
                  03
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Servings
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                >
                  103
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Cal
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View style={{ marginTop: 20 }}>
            <Text
              style={{ fontSize: hp(2.5), fontWeight: "bold", color: "#333" }}
            >
              Ingredients
            </Text>
            <View style={{ marginLeft: 16 }}>
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View
                    key={i}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "#f59e0b",
                        borderRadius: 4,
                        marginRight: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: hp(1.7),
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {meal["strMeasure" + i]}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp(1.7),
                        color: "#555",
                        marginLeft: 8,
                      }}
                    >
                      {meal["strIngredient" + i]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View style={{ marginTop: 20 }}>
            <Text
              style={{ fontSize: hp(2.5), fontWeight: "bold", color: "#333" }}
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6), color: "#555", marginTop: 8 }}>
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {meal.strYoutube && (
            <Animated.View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: hp(2.5), fontWeight: "bold", color: "#333" }}
              >
                Recipe Video
              </Text>
              <View style={{ marginTop: 8 }}>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
