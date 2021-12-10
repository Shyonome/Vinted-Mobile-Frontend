import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileScreen({ setToken, userToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picker, setPicker] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const profile = async () => {
      try {
        const response = await axios.post(
          "https://vinted-mobile.herokuapp.com/profile",
          {},
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          setProfile(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.message.error);
      }
    };
    profile();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      setPicker(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  const update = async () => {
    try {
      setError("");
      const formData = new FormData();
      if (!email) {
        setError("Email required");
      } else {
        formData.append("email", email);
      }
      if (username) {
        formData.append("username", username);
      }
      if (password) {
        formData.append("password", password);
      }
      if (picker) {
        const tab = picker.split(".");
        formData.append("picture", {
          uri: picker,
          name: `my-pic.${tab[1]}`,
          type: `image/${tab[1]}`,
        });
      }
      if (email && (username || password || picker)) {
        const response = await axios.post(
          "https://vinted-mobile.herokuapp.com/update",
          formData,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data && !error) {
          //console.log(response.data);
          setData(response.data);
          alert("Modifications saved");
        }
      }
    } catch (error) {
      console.log(error.response.message.error);
    }
  };

  return isLoading ? (
    <ActivityIndicator color="#09B1BA" size="large" />
  ) : (
    <View style={[styles.view]}>
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#22B9C1",
            height: "30%",
            marginBottom: 20,
          },
        ]}
      >
        { picker ? (
          <Image
            style={[styles.userImage, { marginBottom: 5 }]}
            source={{ uri: picker }}
          />
        ) : profile.account.avatar ? (
          <TouchableOpacity onPress={getCameraPermission}>
            <Image
              style={[styles.userImage, { marginBottom: 5 }]}
              source={{ uri: profile.account.avatar.secure_url }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#22B9C1",
                height: "30%",
                marginBottom: 20,
              },
            ]}
          >
            <TouchableOpacity onPress={getCameraPermission}>
              <Ionicons
                style={[{ marginBottom: 5 }]}
                name="help"
                size={150}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={[{ color: "white" }]}>{profile.account.username}</Text>
      </View>
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
      </View>
      <View style={[{ width: "100%", alignItems: "center", marginTop: 90 }]}>
        <Text style={[{color: "red"}]} >{error}</Text>
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

  userImage: {
    height: 100,
    width: 100,
    borderRadius: 300,
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
