import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../Screens/Signin";
import Resetpassword from "../Screens/Resetpassword";
import Forgotpassword from "../Screens/Forgotpassword";
import NewPassword from "../Screens/NewPassword";
import Home from "../Screens/Home";
import ChangePassword from "../Screens/Changepassword";
import { NetworkContext } from "../Context/NetworkContext";
import StartShift from "../Screens/StartShift/StartShift";
import EditProfile from "../Screens/EditProfile";
import MounthHours from "../Screens/MonthHours";
import SendShifts from "../Screens/SendShifts";
import ShowReports from "../Screens/ShowReports";

const Stack = createNativeStackNavigator();
/// the navigation of the screens of the app
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={Signin}></Stack.Screen>
        <Stack.Screen
          name="ResetPassword"
          component={Resetpassword}
        ></Stack.Screen>
        <Stack.Screen
          name="ForgotPassword"
          component={Forgotpassword}
        ></Stack.Screen>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>

        <Stack.Screen name="NewPassword" component={NewPassword}></Stack.Screen>

        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
        ></Stack.Screen>
        <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
        <Stack.Screen name="SendShifts" component={SendShifts}></Stack.Screen>
        <Stack.Screen name="StartShift" component={StartShift}></Stack.Screen>
        <Stack.Screen name="MounthHours" component={MounthHours}></Stack.Screen>
        <Stack.Screen name="ShowReports" component={ShowReports}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
