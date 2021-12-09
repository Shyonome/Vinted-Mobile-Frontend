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
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResearchScreen({ priceMin, priceMax, sort, sortByDate }) {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters = filters + `title=${title}`;
        }
        if (priceMin) {
          if (filters) {
            filters = filters + "&";
          }
          filters = filters + `priceMin=${priceMin}`;
        }
        if (priceMax) {
          if (filters) {
            filters = filters + "&";
          }
          filters = filters + `priceMax=${priceMax}`;
        }
        if (sort) {
          if (filters) {
            filters = filters + "&";
          }
          filters = filters + "sort=price-asc";
        } else {
          if (filters) {
            filters = filters + "&";
          }
          filters = filters + "sort=price-desc";
        }
        const response = await axios.get(
          `https://vinted-mobile.herokuapp.com/offers?${filters}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [title, priceMin, priceMax, sort]);

  return isLoading ? (
    <ActivityIndicator color="#09B1BA" size="large" />
  ) : (
    <View>
      <View style={[styles.view]} >
        <View style={[styles.row, styles.center, {height: 50, marginLeft: 15}]}>
          <Ionicons name={"search"} size={20} color="gray" />
          <TextInput
            style={[styles.inputs]}
            placeholder="ex: Costume spider-man"
            onChangeText={(text) => {
              setTitle(text);
            }}
            value={title}
          />
        </View>
        <View style={[styles.class, {marginLeft: 15}]}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Class");
            }}
          >
            <Text>Classer par</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Price");
            }}
          >
            <Text>Prix</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ marginLeft: 15 }]}>
          <Text>{data.count} résultats</Text>
        </View>
      </View>
      <View style={[styles.underView]}>
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
                      navigation.navigate("Buyer", { offerId: item._id });
                    }}
                  >
                    <View style={[styles.row, styles.center]}>
                      {item.owner.account.avatar ? (
                        <Image
                          source={{ uri: item.owner.account.avatar.secure_url }}
                          style={[styles.avatar, { marginRight: 5 }]}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons
                          style={[{ marginRight: 5 }]}
                          name={"person-outline"}
                          size={30}
                        />
                      )}
                      <Text numberOfLines={1}>
                        {item.owner.account.username}
                      </Text>
                    </View>
                    {item.product_image ? (
                      <Image
                        source={{ uri: item.product_image.secure_url }}
                        style={[styles.offerImage]}
                        resizeMode="cover"
                      />
                    ) : (
                      <Ionicons name="help" size={190} color="black" />
                    )}
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
                  <Text numberOfLines={1}>{item.product_price} €</Text>
                  <Text numberOfLines={1}>
                    {item.product_details[0].MARQUE}
                  </Text>
                  <Text numberOfLines={1}>
                    {item.product_details[1].TAILLE} /{" "}
                    {item.product_details[2].ÉTAT}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
  },

  underView: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  class: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
  },

  inputs: {
    height: 35,
    width: 170,
    marginBottom: 30,
    marginTop: 30,
    paddingLeft: 10,
    borderRadius: 5,
    color: "black",
    backgroundColor: "#EBEBEB",
  },

  bottomBar: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  button: {
    height: 30,
    width: 80,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D7D7D7",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
    width: 160,
  },
});
