import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";
import axios from "axios";
import { Checkbox } from "react-native-paper";

export default function SellScreen({ userToken }) {
  const [picker, setPicker] = useState(null);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const [checked, setChecked] = useState(false);

  const getGaleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        console.log(result.uri);
        setPicker(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      setPicker(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  const publish = async () => {
    try {
      const formData = new FormData();
      formData.append("title", { title: title });
      formData.append("description", { description: description });
      formData.append("size", { size: Number(size) });
      formData.append("brand", { brand: brand });
      formData.append("condition", { condition: condition });
      formData.append("price", { price: Number(price) });
      if (picker) {
        const tab = picker.split(".");
        formData.append("photo", {
          uri: picker,
          name: `my-pic.${tab[1]}`,
          type: `image/${tab[1]}`,
        });
      }
      const response = await axios.post(
        "https://vinted-mobile.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        alert("Annonce publié");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      {!picker ? (
        <View style={[styles.imageView]}>
          <TouchableOpacity
            style={[styles.imagePicker]}
            onPress={getGaleryPermission}
          >
            <Text style={[styles.imagePickerText]}>+ Ajouter photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.imagePicker]}
            onPress={getCameraPermission}
          >
            <Text style={[styles.imagePickerText]}>Prendre une phtoto</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.imageView]}>
          <TouchableOpacity
            onPress={() => {
              setPicker(null);
            }}
          >
            <Image
              style={[styles.picked]}
              source={{ uri: picker }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.inputsView]}>
        <Text style={[{ marginLeft: 15 }]}>Titre</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="ex: Chemise Sézane verte"
          onChangeText={(text) => {
            setTitle(text);
          }}
          value={title}
        />

        <Text style={[{ marginLeft: 15 }]}>Décris ton article</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="ex: porté quelques fois"
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
        />
      </View>

      <View style={[styles.inputsView2]}>
        <Text style={[{ marginLeft: 15 }]}>Taille</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="ex: 36"
          onChangeText={(text) => {
            setSize(text);
          }}
          value={size}
        />

        <Text style={[{ marginLeft: 15 }]}>Marque</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="ex: ZARA"
          onChangeText={(text) => {
            setBrand(text);
          }}
          value={brand}
        />

        <Text style={[{ marginLeft: 15 }]}>Etat</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="ex: très mauvais"
          onChangeText={(text) => {
            setCondition(text);
          }}
          value={condition}
        />
      </View>

      <View style={[styles.inputsView3]}>
        <Text style={[{ marginLeft: 15 }]}>Prix</Text>
        <TextInput
          style={[styles.inputs]}
          placeholder="ex: 150 €"
          onChangeText={(text) => {
            setPrice(text);
          }}
          value={price}
        />
      </View>

      <View style={[styles.checkbox]}>
        <Text>Je ne suis pas intéressé(e) par les échanges</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>

      <TouchableOpacity
        style={[styles.add, { marginLeft: 15 }]}
        onPress={publish}
      >
        <Text style={[styles.addText]}>Ajouter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageView: {
    height: 100,
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },

  imagePicker: {
    height: 25,
    width: 130,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#09B1BA",
    alignItems: "center",
    justifyContent: "center",
  },

  imagePickerText: {
    color: "#09B1BA",
  },

  picked: {
    height: 70,
    width: 70,
  },

  inputsView: {
    height: 130,
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },

  inputsView2: {
    height: 200,
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },

  inputsView3: {
    height: 80,
    width: "100%",
    marginBottom: 5,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },

  inputs: {
    marginLeft: 15,
    marginBottom: 5,
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  checkbox: {
    marginLeft: 15,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },

  add: {
    height: 50,
    width: 335,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09B1BA",
  },

  addText: {
    color: "white",
  },
});
