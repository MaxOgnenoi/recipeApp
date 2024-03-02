import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ paddingTop: hp(14) }}
      >
        {/* avatar and bell icon */}
        <View
          style={{
            marginHorizontal: 4,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline*/}
        <View style={{ marginHorizontal: 4, marginBottom: 2 }}>
          <Text style={{ fontSize: hp(1.7), color: "gray" }}>Hello, Max!</Text>
          <Text
            style={{ fontSize: hp(3.8), fontWeight: "bold", color: "gray" }}
          >
            Make your own food,
          </Text>
          <Text
            style={{ fontSize: hp(3.8), fontWeight: "bold", color: "gray" }}
          >
            stay at <Text style={{ color: "#FFC400" }}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View
          style={{
            marginHorizontal: 4,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "rgba(0,0,0,0.05)",
            padding: 6,
          }}
        >
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{
              flex: 1,
              fontSize: hp(1.7),
              marginBottom: 1,
              paddingLeft: 3,
            }}
          />
          <View
            style={{ backgroundColor: "white", borderRadius: 20, padding: 3 }}
          >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories}></Recipes>
        </View>
      </ScrollView>
    </View>
  );
}
