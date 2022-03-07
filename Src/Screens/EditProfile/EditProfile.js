import { View, Text } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native-web";
import Custombutton from "../../Components/Custombutton";
import Custominput from "../../Components/Custominput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import axios from "axios";

const EditProfile = ({ route, navigation }) => {
  const worker = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onEditPress = async (data) => {
    const user = {
      fName: "",
      email: "",
      phoneNumber: "",
      age: "",
    };

    if (data.fName == undefined) {
      user.fName = worker.worker.worker.fName;
    } else if (data.fName != undefined) {
      user.fName = data.fName;
    }
    if (data.email == undefined) {
      user.email = worker.worker.worker.email;
    } else if (data.email != undefined) {
      user.email = data.email;
    }

    if (data.phoneNumber == undefined) {
      user.phoneNumber = worker.worker.worker.phoneNumber;
    } else if (data.phoneNumber != undefined) {
      user.phoneNumber = data.phoneNumber;
    }

    if (data.age == undefined) {
      user.age = worker.worker.worker.age;
    } else if (data.age != undefined) {
      user.age = data.age;
    }

    await axios

      .put("https://masterway.herokuapp.com/workers/app", user)

      .then((resp) => {
        alert("Your Infomration has been changed ");
      })
      .catch((err) => alert("There is problem"));
  };
  return (
    <SafeAreaView style={Styles.root}>
      <Text style={Styles.title}>Name</Text>
      <Custominput placeholder={"Full Name"} control={control} name="fName" />
      <Text style={Styles.title}>Email</Text>
      <Custominput placeholder={"Email"} control={control} name="email" />
      <Text style={Styles.title}>Age</Text>
      <Custominput placeholder={"Age"} control={control} name="age" />
      <Text style={Styles.title}>Phone Number</Text>
      <Custominput
        placeholder={"Phone Number"}
        control={control}
        name="phoneNumber"
      />
      <Custombutton
        text="Edit your profile"
        onPress={handleSubmit(onEditPress)}
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
  title1: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
    marginTop: 100,
  },
});

export default EditProfile;
