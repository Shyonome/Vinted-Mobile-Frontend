import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import React, {useState} from "react";
import axios from "axios";

export default function ResearchScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Research Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});