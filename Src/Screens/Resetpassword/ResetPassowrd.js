import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Custombutton from "../../Components/Custombutton";
import Custominput from "../../Components/Custominput";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Spinner from "react-native-loading-spinner-overlay";

import axios from "axios";

const ResetPassword = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);

  const email = route.params;
  const x = email.email.email;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onConfirmPressed = async (data) => {
    setLoading(true);

    const y = data.code;
    const user = {
      email: "",
      code: "",
    };
    user.email = x;
    user.code = y;
    await axios
      .post("https://masterway.herokuapp.com/mobapp/confirm", user)
      .then((resp) => {
        navigation.navigate("NewPassword", {
          email: x,
          code: y,
        });
      })
      .catch((err) => alert("The code is not correct"));
    setLoading(false);
  };
  const onSendPressed = async () => {
    setLoading(true);
    await axios
      .patch(`https://masterway.herokuapp.com/mobapp`, email.email)
      .then((resp) => {
        alert("The code has been sent again");
      })
      .catch((err) => alert("There is no such email"));
    setLoading(false);
  };
  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"sending ...."}
        //Text style of the Spinner Text
        textStyle={Styles.spinnerTextStyle}
      />
    );
  }
  return (
    <ScrollView style={{ backgroundColor: "#6f00ff" }}>
      <View style={Styles.root}>
        <Text style={Styles.title}>Confirm your email</Text>
        <Custominput placeholder="code" control={control} name="code" />

        <Custombutton
          text="Confirm"
          onPress={handleSubmit(onConfirmPressed)}
          type="PRIMARY"
        ></Custombutton>
        <Custombutton
          text="Send Again"
          onPress={handleSubmit(onSendPressed)}
          type="SECONDARY"
        ></Custombutton>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  back: {
    backgroundColor: "#6f00ff",
    flex: 1,
  },
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6f00ff",
    flex: 1,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03dac5",
    margin: 10,
  },
});

export default ResetPassword;
