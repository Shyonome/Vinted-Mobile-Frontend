import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      if (email && password) {
        setError("");
        const response = await axios.post(
          "https://vinted-mobile.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        if (response.data) {
          console.log(response.data);
          setData(response.data);
          setToken(response.data.token);
        }
      } else {
        setError("Vous devez remplir tous les champs disponible.");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View style={[styles.spaced]} >
      <View style={[styles.center, {marginBottom: 20}]}>
        <TextInput
          style={[styles.inputs]}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          style={[styles.inputs]}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
      </View>
      <View style={[styles.center]}>
        {error ? <Text style={[styles.error]}>{error}</Text> : null}
        <TouchableOpacity style={styles.signin} onPress={signIn}>
          <Text style={[styles.signinText]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={[styles.vintedColor]}>
            Tu as oublié ton mot de passe ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={[styles.vintedColor]}>Un problème ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },

  center: {
    alignItems: "center",
  },

  spaced: {
    justifyContent: "space-between",
  },

  inputs: {
    marginLeft: 10,
    marginBottom: 10,
    height: 40,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  signin: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09B1BA",
  },

  signinText: {
    color: "white",
  },

  vintedColor: {
    color: "#09B1BA",
  },
});
