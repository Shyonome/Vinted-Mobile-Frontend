import { Platform, StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import React, {useState} from "react";
import axios from "axios";

export default function ProfileScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Profile Page</Text>
      
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});