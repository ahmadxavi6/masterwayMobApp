import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableHighlight,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NetworkContext } from "../../Context/NetworkContext";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import Custombutton from "../../Components/Custombutton";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const StartShift = ({ route, navigation }) => {
  const worker = route.params;
  const user = { email: "", Long: "", Lati: "" };
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [time, setTime] = useState("");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const sendTime = async () => {
    setIsStopwatchStart(false);
    console.log(time);
    navigation.navigate("Home1");
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const interval = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        let lati = "Waiting..";
        let long = "Waiting..";
        if (errorMsg) {
          lati = errorMsg;
        } else if (location) {
          lati = JSON.stringify(location.coords.latitude);
          long = JSON.stringify(location.coords.longitude);
        }
        user.email = worker.worker.worker.email;
        user.Lati = lati;
        user.Long = long;

        axios
          .put("https://masterway.herokuapp.com/workers/getlocation", user)

          .then((resp) => {})
          .catch((err) => alert("There is problem"));
      }, 60000);
      return () => clearInterval(interval);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Shift has started</Text>
        <Text style={styles.title}>Dont leave this page in the app</Text>
        <Text style={styles.title}>in order to keep track of your hours</Text>
        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            options={options}
            getTime={(time) => {
              setTime(time);
            }}
          />
          <Custombutton
            text="Finish your shift "
            type="FORTH"
            onPress={sendTime}
          >
            <Text>End Shift</Text>
          </Custombutton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
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
  sectionStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 7,
  },
};

export default StartShift;
