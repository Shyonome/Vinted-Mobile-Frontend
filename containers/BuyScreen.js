import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BuyerScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-mobile.herokuapp.com/offer/${params.offerId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return isLoading ? (
    <ActivityIndicator color="#09B1BA" size="large" />
  ) : (
    <View>
      <View key={data._id}>
        <Image
          style={[styles.offerImage]}
          source={{ uri: data.product_image.secure_url }}
        />
        {data.owner.account.avatar.secure_url ? (
          <Image
            source={{ uri: data.owner.account.avatar.secure_url }}
            style={[styles.avatar]}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name={"person-outline"} size={24} color="black" />
        )}
        <Text>{data.product_name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  offerImage: {
    height: 100,
    width: 100,
  },

  avatar: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
});
