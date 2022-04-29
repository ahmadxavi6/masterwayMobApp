import React, { useState } from "react";
import axios from "axios";
import { NetworkContext } from "../../Context/NetworkContext";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
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
      .catch((err) => alert("server problem"));
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
            <Text style={styles.x}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={onPress2}>
            <Text style={styles.x}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={update}>
            <Text style={styles.x}>Refresh Profile</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6f00ff",
  },
  header: {
    backgroundColor: "#3700b3",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#a56ca7",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
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
    color: "#03dac5",

    fontWeight: "bold",
  },
  info: {
    fontSize: 20,
    color: "#03dac5",
    marginTop: 10,
    fontWeight: "bold",
  },

  description: {
    fontSize: 20,
    color: "#03dac5",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
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
    fontSize: 18,
    backgroundColor: "#3700b3",
  },
  x: {
    fontSize: 18,
    color: "#03dac5",
  },
});
export default Profile;
