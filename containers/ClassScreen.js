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

export default function ClassScreen({ setToken }) {
    const { params } = useRoute();
    return (
      <View>
        <Text>Class Screen</Text>
      </View>
    );
  }
  