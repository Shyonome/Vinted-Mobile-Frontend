import { Platform, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vinted-mobile.herokuapp.com/offers?limit=8');
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? <ActivityIndicator color="#09B1BA" size="large" /> : (
    <View style={[ styles.view ]}>
      <View style={[styles.imageGrid]} >
      {data.offers.map((elem) => {
        return (
          <View key={elem._id}>
            <Image style={[styles.images]} resizeMode="cover" source={{uri: elem.product_image.secure_url}} />
          </View>
        );
      })}
      </View>
      <View>
      <View style={[styles.h1View]} >
        <Text style={[ styles.h1 ]} >Vends sans frais ce que tu ne portes plus.</Text>
        <Text style={[ styles.h1 ]} >Rejoins nous !</Text>
      </View>
      
      <View style={{alignItems: "center"}} >
      <TouchableOpacity style={[ styles.signup ]} activeOpacity={0.8} onPress={() => {
        navigation.navigate('SignUp');
      }} >
        <Text style={[styles.signupText]} >S'inscrire sur Vinted</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.signin]} activeOpacity={0.8} onPress={() => {
        navigation.navigate('SignIn');
      }} >
        <Text style={[styles.signinText]} >J'ai déjà un compte</Text>
      </TouchableOpacity>
      </View>
      
      <View style={[styles.footerText]} >
        <Text style={[styles.footerLeft]} >A Propos de Vinted : </Text>
        <TouchableOpacity activeOpacity={0.8} >
          <Text style={[styles.footerRight]}>Notre plateform</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },

  imageGrid: {
    width: 340,
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  images: {
    marginBottom: 25,
    height: 100,
    width: 84,
  },

  h1View: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
  },
  
  h1: {
    fontSize: 25,
    color: "#515151",
    textAlign: "center",
  },
  
  signup: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09B1BA",
  },
  
  signupText: {
    color: "white",
  },
  
  signin: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#09B1BA",
    alignItems: "center",
    justifyContent: "center",
  },

  signinText: {
    color: "#09B1BA",
  },

  footerText: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  footerLeft: {
    color: "#D2D2D2",
    fontSize: 10,
  },

  footerRight: {
    color: "#838383",
    fontSize: 10,
  },

});