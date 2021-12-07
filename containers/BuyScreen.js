import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
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
  const [heart, setHeart] = useState(false);

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
    <View style={[styles.underView]}>
      <View style={[styles.view]}>
        {data.product_image ? <Image
          style={[styles.offerImage, { marginBottom: 5 }]}
          source={{ uri: data.product_image.secure_url }}
          resizeMode="contain"
        /> : <View style={[{justifyContent:"center", alignItems: "center"}]} >
          <Ionicons style={[{ marginBottom: 5 }]} name="help" size={150} color="black" />
          </View>}
        <View style={[{ marginLeft: 15, paddingBottom: 10 }]}>
          <View
            style={[
              styles.row,
              styles.center,
              { marginBottom: 5, paddingBottom: 10 },
              styles.bottomBar,
            ]}
          >
            {data.owner.account.avatar ? (
              <Image
                source={{ uri: data.owner.account.avatar.secure_url }}
                style={[styles.avatar]}
                resizeMode="cover"
              />
            ) : (
              <Ionicons style={[{marginRight: 15}]} name={"person-outline"} size={24} color="black" />
            )}
            <Text>{data.owner.account.username}</Text>
          </View>
          <View
            style={[{ marginBottom: 5, paddingBottom: 10 }, styles.bottomBar]}
          >
            <Text>{data.product_name}</Text>
            <Text numberOfLines={1}>
              {data.product_details[1].TAILLE} /{" "}
              {data.product_details[3].COULEUR} - {data.product_details[2].ÉTAT}{" "}
              - {data.product_details[0].MARQUE}
            </Text>
            <Text>{data.product_price} €</Text>
          </View>
          <View>
            <Text style={[{ marginBottom: 5 }]}>Présentation de l'article</Text>
            <Text>{data.product_description}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.view, { marginTop: 10 }]}>
        <View style={[{ marginLeft: 15 }]}>
          <View
            style={[
              styles.row,
              { marginBottom: 10, marginLeft: 60, marginTop: 5 },
            ]}
          >
            <View style={[styles.row]}>
              {heart ? (
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
              )}
            </View>
            <View style={[styles.row, { marginRight: 60 }]}>
              <TouchableOpacity style={[]}>
                <Text>Favoris</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.row]} >
              <Ionicons
                style={[{ marginRight: 5 }]}
                name="share-social"
                size={20}
                color="black"
              />
              <Text>Partager</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[styles.message]} activeOpacity={0.5}>
              <Text style={[styles.messageText]}>Envoyer un message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buy]} activeOpacity={0.8}>
              <Text style={[styles.buyText]}>Acheter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
  },

  underView: {
    justifyContent: "space-between",
    height: "95%"
  },

  row: {
    flexDirection: "row",
  },

  center: {
    alignItems: "center",
  },

  bottomBar: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  offerImage: {
    height: "45%",
    width: "100%",
  },

  avatar: {
    height: 35,
    width: 35,
    borderRadius: 30,
    marginRight: 15,
  },

  message: {
    height: 50,
    width: 335,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#09B1BA",
    alignItems: "center",
    justifyContent: "center",
  },

  messageText: {
    color: "#09B1BA",
  },

  buy: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09B1BA",
  },

  buyText: {
    color: "white",
  },
});
