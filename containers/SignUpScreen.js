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
import { Checkbox } from "react-native-paper";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [checked, setChecked] = useState(false);

  const signUp = async () => {
    try {
      if (username && email && password) {
        setError("");
        const response = await axios.post(
          "https://vinted-mobile.herokuapp.com/user/signup",
          {
            email: email,
            username: username,
            password: password,
          }
        );
        if (response.data) {
          //console.log(response.data);
          setData(response.data);
          setToken(response.data.token);
        }
      } else {
        setError("Vous devez remplir tous les champs disponible.");
      }
    } catch (error) {
      console.log(error.response);
      setError(error.response);
    }
  };

  return (
    <View>
      <View>
        <View style={[styles.margin]}>
          <TextInput
            style={[styles.inputs]}
            placeholder="Nom d'utilisateur"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
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
        {error ? <Text style={[styles.error]}>{error}</Text> : null}
        <View>
          <View style={[styles.checkbox]}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>S'inscrire à notre newsletter</Text>
          </View>
          <View style={[styles.margin]}>
            <Text style={[styles.checkboxText]}>
              En m'inscrivant, je confirme avoir lu et accepté les{" "}
              <Text style={[styles.checkboxTextAlternate]}>
                Conditions Générales d'Utilisation
              </Text>{" "}
              et la{" "}
              <Text style={[styles.checkboxTextAlternate]}>
                {" "}
                Politique de Confidentialité
              </Text>{" "}
              de Vinted.
            </Text>
            <Text style={[styles.checkboxText]}>
              Je confirme aussi avoir au moins 18 ans.
            </Text>
          </View>
          <View style={[styles.center]}>
            <TouchableOpacity style={[styles.signup]} activeOpacity={0.8} onPress={signUp}>
              <Text style={[styles.signupText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.spaced]}>
            <Text style={[styles.checkboxTextAlternate]}>Un problème ?</Text>
          </View>
        </View>
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
    alignItems: "center",
  },

  margin: {
    marginBottom: 20,
  },

  inputs: {
    marginLeft: 10,
    marginBottom: 5,
    height: 40,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxText: {
    fontSize: 12,
    color: "#949494",
    marginLeft: 10,
  },

  checkboxTextAlternate: {
    color: "#09B1BA",
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
});
