import { View, Text } from "react-native";
import React from "react";
import Home1 from "../Home1/Home1";
import Profile from "../Profile";
import Shifts from "../Shifts";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NetworkContext } from "../../Context/NetworkContext";
import { useForm } from "react-hook-form";
import ChangePassword from "../Changepassword";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = ({ route, navigation }) => {
  return (
    <NetworkContext.Provider value={route.params}>
      <Tab.Navigator
        activeColor="#03dac5"
        inactiveColor="#f0edf6"
        barStyle={{ backgroundColor: "#3700b3" }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          name="Home1"
          component={Home1}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Shifts",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
          name="Shifts"
          component={Shifts}
        />
      </Tab.Navigator>
    </NetworkContext.Provider>
  );
};

export default Home;
