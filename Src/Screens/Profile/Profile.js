import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NetworkContext } from "../../Context/NetworkContext";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Profile = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);

  const worker = React.useContext(NetworkContext);
  const initialState = {
    profilepic: worker.worker.profilepic,
    fName: worker.worker.fName,
    ID: worker.worker.ID,
    age: worker.worker.age,
    email: worker.worker.email,
    phoneNumber: worker.worker.phoneNumber,
  };
  const [state, setState] = useState(initialState);

  const update = async () => {
    setLoading(true);

    const user = {
      email: "",
    };
    user.email = worker.worker.email;
    await axios

      .put("https://masterway.herokuapp.com/workers/appprofile", user)
      .then((resp) => {
        setState(resp.data);
      })
      .catch((err) => console.log("Problem"));
    setLoading(false);
  };

  const onPress1 = () => {
    navigation.navigate("ChangePassword", { worker: worker });
  };
  const onPress2 = () => {
    navigation.navigate("EditProfile", { worker: worker });
  };

  let ed = "data:image/png;base64," + state.profilepic;
  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Refresh Profile ...."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}></SafeAreaView>
      <Image style={styles.avatar} source={{ uri: ed }} />
      <SafeAreaView style={styles.body}>
        <SafeAreaView style={styles.bodyContent}>
          <Text style={styles.name}>{state.fName}</Text>
          <Text style={styles.info}>{state.ID}</Text>
          <Text style={styles.description}>Age: {state.age}</Text>
          <Text style={styles.description}>Email: {state.email}</Text>
          <Text style={styles.description}>
            Phone Number: {state.phoneNumber}
          </Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={onPress1}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={onPress2}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={update}>
            <Text>Refresh Profile</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: "center",
    padding: 30,
  },
  name: {
    marginTop: 10,
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },

  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
export default Profile;
