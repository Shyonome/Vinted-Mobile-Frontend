import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Dimensions,
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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";

import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import ResearchScreen from "./containers/ResearchScreen";
import SellScreen from "./containers/SellScreen";
import AnnonceScreen from "./containers/AnnonceScreen";
import BuyerScreen from "./containers/BuyScreen";
import ClassScreen from "./containers/ClassScreen";
import PriceScreen from "./containers/PriceScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="Home"
              options={{
                title: "Vinted",
                headerStyle: { backgroundColor: "#FFFFFF" },
                headerTitleStyle: {
                  color: "#09B1BA",
                  fontWeight: "bold",
                  fontSize: 30,
                },
              }}
            >
              {() => <HomeScreen />}
            </Stack.Screen>

            <Stack.Screen name="SignIn" options={{
              title: "Connecte toi",
            }} >
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{
              title: "Inscris toi",
            }} >
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "#09B1BA",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                {/* Annonce Screen */}
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Acceuil",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Annonce"
                        options={{
                          title: "Annonces",
                          headerShown: true,
                          headerStyle: { backgroundColor: "#FFFFFF" },
                          headerTitleStyle: {
                            fontSize: 20,
                          },
                        }}
                      >
                        {() => <AnnonceScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Buyer"
                        options={{
                          title: "",
                          headerStyle: { backgroundColor: "#FFFFFF" },
                        }}
                      >
                        {() => <BuyerScreen /> }
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* Research Screen */}
                <Tab.Screen
                  name="TabResearch"
                  options={{
                    tabBarLabel: "Research",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"search"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Research"
                        options={{
                          headerShown: true,
                        }}
                      >
                        {() => <ResearchScreen priceMin={priceMin} priceMax={priceMax} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Class"
                        options={{
                          title: "Classer par",
                          headerShown: true,
                        }}
                      >
                        {() => <ClassScreen /> }
                      </Stack.Screen>

                      <Stack.Screen
                        name="Price"
                        options={{
                          title: "Prix",
                          headerShown: true,
                        }}
                      >
                        {() => <PriceScreen setPriceMin={setPriceMin} priceMin={priceMin} setPriceMax={setPriceMax} priceMax={priceMax} /> }
                      </Stack.Screen>

                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* Sell Screen */}
                <Tab.Screen
                  name="TabSell"
                  options={{
                    tabBarLabel: "Vendre",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"add-circle-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Sell"
                        options={{
                          title: "Vends ton article",
                        }}
                      >
                        {() => <SellScreen userToken={userToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* Profile Screen */}
                <Tab.Screen
                  name="TabProfile"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                        }}
                      >
                        {() => <ProfileScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
