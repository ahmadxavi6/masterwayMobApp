import { View, Text } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native-web";
import Custombutton from "../../Components/Custombutton";
import Custominput from "../../Components/Custominput";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const ChangePassword = ({ route, navigation }) => {
  const worker = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChangePasswordPressed = async (data) => {
    if (String(data.password1) !== String(data.password2)) {
      alert("The password dont match");
      return;
    }
    const user = {
      email: "",
      password: "",
    };
    user.email = worker.worker.worker.email;
    user.password = data.password1;
    console.log(user);
    await axios
      .post(`https://masterway.herokuapp.com/mobapp/reset`, user)
      .then((resp) => {
        alert("The password has changed");
      })
      .catch((err) => alert("The code is not correct"));
  };
  return (
    <SafeAreaView style={Styles.root}>
      <Text style={Styles.title}>Chosse your new passowrd</Text>
      <Custominput
        placeholder={"Chosse new password"}
        control={control}
        name="password1"
        secureTextEntry={true}
        rules={{ required: "Password is Required" }}
      />
      <Custominput
        placeholder={"Confirm your password"}
        control={control}
        secureTextEntry={true}
        rules={{ required: "Confirm password is Required" }}
        name="password2"
      />

      <Custombutton
        text="Change Password"
        onPress={handleSubmit(onChangePasswordPressed)}
        type="FORTH"
      ></Custombutton>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00BFFF",
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
    color: "#051c60",
    margin: 10,
  },
});

export default ChangePassword;
