import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";
import axios from "axios";

export default function ProfileScreen({ setToken, userToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const update = async () => {
    try {
      if (email && username && password) {
        const response = await axios.post(
          "https://vinted-mobile.herokuapp.com/update",
          {
            email: email,
            username: username,
            password: password,
          },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          setData(response.data);
        }
      }
    } catch (error) {
      console.log(error.response.message.error);
    }
  };

  return (
    <View style={[styles.view]}>
      <View style={[{ marginLeft: 15 }]}>
        <Text>Email</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="email@exemple.com"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />

        <Text>Pseudo</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="Nom d'utilisateur"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />

        <Text>Mot de passe</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <TouchableOpacity style={[styles.submit]} onPress={update}>
          <Text style={[styles.submitText]}>Sauvegarder les modifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submit]}
          onPress={() => {
            setToken(null);
          }}
        >
          <Text style={[styles.submitText]}>Log out</Text>
        </TouchableOpacity>
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

  inputs: {
    marginBottom: 5,
    height: 40,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  submit: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09B1BA",
  },

  submitText: {
    color: "white",
  },
});
