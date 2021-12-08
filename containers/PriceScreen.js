import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PriceScreen({ setPriceMin, priceMin, setPriceMax, priceMax }) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={[styles.row, {marginTop: 10, alignItems: "center"}]}>
        <View style={[{ width: 90 }]}>
          <Text>Prix minimum</Text>
          <TextInput
            style={[styles.inputs]}
            placeholder="€"
            onChangeText={(text) => {
              setPriceMin(text);
            }}
            value={priceMin}
          />
        </View>
        <View style={[{ width: 100 }]}>
          <Text>Prix maximum</Text>
          <TextInput
            style={[styles.inputs]}
            placeholder="€"
            onChangeText={(text) => {
              setPriceMax(text);
            }}
            value={priceMax}
          />
        </View>
      </View>
      <View style={[{alignItems: "center", marginTop: 440}]}>
        <TouchableOpacity
          style={[styles.submit]}
          onPress={() => {
            navigation.navigate("Research");
          }}
        >
          <Text style={[{ color: "white" }]}>Afficher les résultats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  inputs: {
    marginLeft: 10,
    marginBottom: 5,
    height: 40,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#09B1BA",
  },

  submit: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09B1BA",
  },
});
