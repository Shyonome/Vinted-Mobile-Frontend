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
import { Checkbox } from "react-native-paper";
export default function ClassScreen({
  setSort,
  sort,
  setSortByDate,
  sortByDate,
}) {
  const navigation = useNavigation();
  // const [checkSortAsc, setCheckSortAsc] = useState(false);
  // const [checkSortDesc, setCheckSortDesc] = useState(false);
  // const [checkAscDate, setCheckAscDate] = useState(false);
  // const [checkDescDate, setCheckDescDate] = useState(false);
  // checkSortAsc ? setSort("price-asc") : setSort("");
  // checkSortDesc ? setSort("price-desc") : setSort("");
  return (
    <View style={[styles.view]}>
      <View style={[styles.row, styles.center]}>
        <Text>Prix Décroissant</Text>
        <Checkbox
          status={sort === "price-desc" ? "checked" : "unchecked"}
          onPress={() => {
            setSort("price-desc");
          }}
        />
      </View>
      <View style={[styles.row, styles.center]}>
        <Text>Prix Croissant</Text>
        <Checkbox
          status={sort === "price-asc" ? "checked" : "unchecked"}
          onPress={() => {
            setSort("price-asc");
          }}
        />
      </View>
      {/* <View style={[styles.row, styles.center]}>
        <Text>Plus anciennes</Text>
        <Checkbox
          status={checkAscDate ? "checked" : "unchecked"}
          onPress={() => {
            setCheckAscDate(!checkAscDate);
            setCheckSortDesc(false);
            setCheckSortAsc(false);
            setCheckDescDate(false);
          }}
        />
      </View> */}
      {/* <View style={[styles.row, styles.center]}>
        <Text>Plus récentes</Text>
        <Checkbox
          status={checkDescDate ? "checked" : "unchecked"}
          onPress={() => {
            setCheckDescDate(!checkDescDate);
            setCheckAscDate(false);
            setCheckSortDesc(false);
            setCheckSortAsc(false);
          }}
        />
      </View> */}
      <View style={[styles.row, { marginLeft: 15 }]}>
        <Text style={[{ color: "#D2D2D2" }]}>
          <Text style={[{ color: "#09B1BA" }]}>En savoir plus</Text> sur la
          façon dont nous trions la pertinance des articles de ton fil
          d'actualité
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },
  center: {
    alignItems: "center",
  },
});
