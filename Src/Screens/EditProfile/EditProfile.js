import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Custombutton from "../../Components/Custombutton";
import Custominput from "../../Components/Custominput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const EditProfile = ({ route, navigation }) => {
  const worker = route.params;
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const uploadPic = async (data) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setLoading(true);

    const img = { profilepic: "", email: "" };
    img.profilepic = result.base64;
    img.email = worker.worker.worker.email;

    await axios

      .post("https://masterway.herokuapp.com/admins/profilepic/mob", img)

      .then((resp) => {
        alert("Profile picture has been changed ");
      })
      .catch((err) => alert("There is problem"));
    setLoading(false);
  };
  const onEditPress = async (data) => {
    setLoading(true);

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
    user._id = data._id;
    await axios

      .put("https://masterway.herokuapp.com/workers/app", user)

      .then((resp) => {
        alert("Your Infomration has been changed ");
      })
      .catch((err) => alert("There is problem"));
    setLoading(false);
  };
  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Update Profile ...."}
        //Text style of the Spinner Text
        textStyle={Styles.spinnerTextStyle}
      />
    );
  }
  return (
    <View style={Styles.back}>
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
        <Custombutton
          text="Change profile picture"
          onPress={handleSubmit(uploadPic)}
          type="SECONDARY"
        ></Custombutton>
      </SafeAreaView>
    </View>
  );
};
const Styles = StyleSheet.create({
  back: {
    backgroundColor: "#82a6e0",
    flex: 1,
  },
  root: {
    alignItems: "center",
    padding: 20,
    flex: 1,
    backgroundColor: "#82a6e0",
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
    color: "black",
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default EditProfile;
