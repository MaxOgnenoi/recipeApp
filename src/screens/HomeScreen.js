import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { CachedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  UsersIcon,
  FireIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "vue-feather-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function RecipeDetailScreen(props) {
  console.log("props.route.params:", props.route.params);

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
      indexes.push(i);
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
      contentContainerStyle={{ paddingBottom: hp(5) }}
      style={{ backgroundColor: "white" }}
    >
      <StatusBar style="light" />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
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

      <Animated.View
        entering={FadeInDown.delay(200).duration(1000)}
        style={{
          width: "100%",
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: hp(14),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: hp(2),
            borderRadius: hp(2),
            marginLeft: wp(5),
            backgroundColor: "white",
          }}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          style={{
            padding: hp(2),
            borderRadius: hp(2),
            marginRight: wp(5),
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

      {loading ? (
        <Loading size="large" style={{ marginTop: hp(16) }} />
      ) : (
        <View
          style={{
            paddingHorizontal: wp(4),
            justifyContent: "space-between",
            paddingTop: hp(8),
          }}
        >
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            style={{ marginBottom: hp(4) }}
          >
            <Text
              style={{ fontSize: hp(3), fontWeight: "bold", color: "#333" }}
            >
              {meal?.strMeal}
            </Text>
            <Text style={{ fontSize: hp(2), color: "#666" }}>
              {meal?.strArea}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: hp(2),
                backgroundColor: "#FFD700",
                padding: hp(2),
              }}
            >
              <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              <View style={{ marginLeft: wp(2) }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                >
                  35
                </Text>
                <Text style={{ fontSize: hp(1.3), color: "#333" }}>Mins</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: hp(2),
                backgroundColor: "#FFD700",
                padding: hp(2),
              }}
            >
              <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              <View style={{ marginLeft: wp(2) }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                >
                  03
                </Text>
                <Text style={{ fontSize: hp(1.3), color: "#333" }}>
                  Servings
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: hp(2),
                backgroundColor: "#FFD700",
                padding: hp(2),
              }}
            >
              <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              <View style={{ marginLeft: wp(2) }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                >
                  103
                </Text>
                <Text style={{ fontSize: hp(1.3), color: "#333" }}>Cal</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: hp(2),
                backgroundColor: "#FFD700",
                padding: hp(2),
              }}
            >
              <Square3Stack3DIcon
                size={hp(4)}
                strokeWidth={2.5}
                color="#525252"
              />
              <View style={{ marginLeft: wp(2) }}>
                <Text
                  style={{ fontSize: hp(2), fontWeight: "bold", color: "#333" }}
                ></Text>
                <Text style={{ fontSize: hp(1.3), color: "#333" }}>Easy</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            style={{ marginBottom: hp(4) }}
          >
            <Text
              style={{ fontSize: hp(2.5), fontWeight: "bold", color: "#333" }}
            >
              Ingredients
            </Text>
            <View style={{ marginLeft: wp(4), marginTop: hp(2) }}>
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View
                    key={i}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: hp(1.5),
                        height: hp(1.5),
                        backgroundColor: "#FFD700",
                        borderRadius: hp(0.75),
                      }}
                    />
                    <View style={{ flexDirection: "row", marginLeft: wp(2) }}>
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
                          color: "#666",
                          marginLeft: wp(2),
                        }}
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            style={{ marginBottom: hp(4) }}
          >
            <Text
              style={{ fontSize: hp(2.5), fontWeight: "bold", color: "#333" }}
            >
              Instructions
            </Text>
            <Text
              style={{ fontSize: hp(1.6), color: "#333", marginTop: hp(1) }}
            >
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {meal.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              style={{ marginBottom: hp(4) }}
            >
              <Text
                style={{ fontSize: hp(2.5), fontWeight: "bold", color: "#333" }}
              >
                Recipe Video
              </Text>
              <View>
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
