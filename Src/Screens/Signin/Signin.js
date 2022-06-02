import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/logo2.png";
import Custominput from "../../Components/Custominput";
import Custombutton from "../../Components/Custombutton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Spinner from "react-native-loading-spinner-overlay";
/// sign in page the first screen showing on the app
const Signin = () => {
  const [loading, setLoading] = useState(false);

  const { height } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /// sign and and cd to the home page
  const onSignInPressed = async (data) => {
    setLoading(true);
    await axios
      .post(`https://masterway.herokuapp.com/mobapp`, data)
      .then((resp) => {
        navigation.navigate("Home", { worker: resp.data });
      })
      .catch((err) => alert("Wrong Email or Password"));
    setLoading(false);
  };
  const navigation = useNavigation();
  /// cd to foget password page
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Log in ...."}
        //Text style of the Spinner Text
        textStyle={Styles.spinnerTextStyle}
      />
    );
  }
  return (
    <ScrollView style={{ backgroundColor: "#6f00ff" }}>
      <View style={Styles.root}>
        <Image
          source={Logo}
          resizeMode="contain"
          style={(Styles.logo, { height: height * 0.5 })}
        ></Image>
        <Custominput
          rules={{ required: "Email is Required" }}
          placeholder="Email"
          control={control}
          name="email"
        />
        <Custominput
          placeholder="Password"
          name="password"
          rules={{ required: "Password is Required" }}
          control={control}
          secureTextEntry={true}
        />

        <Custombutton
          text="Sign In"
          type="PRIMARY"
          onPress={handleSubmit(onSignInPressed)}
        ></Custombutton>
        <Custombutton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        ></Custombutton>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    flex: 1,
    backgroundColor: "#6f00ff",
  },
  logo: { width: "50%" },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default Signin;
