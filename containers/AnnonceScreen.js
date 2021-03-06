import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnnonceScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-mobile.herokuapp.com/offers?"
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator color="#09B1BA" size="large" />
  ) : (
    <View style={[styles.view]}>
      <FlatList
        numColumns={2}
        data={data.offers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={[styles.flatList]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("Buyer", { offerId: item._id});
                  }}
                >
                  <View style={[styles.row, styles.center]}>
                    {item.owner.account.avatar ? (
                      <Image
                        source={{ uri: item.owner.account.avatar.secure_url }}
                        style={[styles.avatar, {marginRight: 5}]}
                        resizeMode="cover"
                      />
                    ) : (
                      <Ionicons style={[{marginRight: 5}]} name={"person-outline"} size={30} />
                    )}
                    <Text numberOfLines={1} >{item.owner.account.username}</Text>
                  </View>
                  {item.product_image ? (
                    <Image
                      source={{ uri: item.product_image.secure_url }}
                      style={[styles.offerImage]}
                      resizeMode="cover"
                    />
                  ) : <Ionicons name="help" size={190} color="black" />}
                </TouchableOpacity>
                {/*heart ? (
                  <Ionicons
                    name="heart"
                    size={20}
                    color="red"
                    onPress={() => {
                      setHeart(!heart);
                    }}
                  />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="black"
                    onPress={() => {
                      setHeart(!heart);
                    }}
                  />
                )*/}
                <Text numberOfLines={1} >{item.product_price} ???</Text>
                <Text numberOfLines={1} >{item.product_details[0].MARQUE}</Text>
                <Text numberOfLines={1} >
                  {item.product_details[1].TAILLE} /{" "}
                  {item.product_details[2].??TAT}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  flatList: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 5,
  },

  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },

  center: {
    alignItems: "center",
  },

  avatar: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },

  offerImage: {
    height: 200,
    width: 160
  },
});
