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
import axios from "axios";
import React from "react";
import { NetworkContext } from "../../Context/NetworkContext";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import Custombutton from "../../Components/Custombutton";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

const StartShift = ({ route, navigation }) => {
  const worker = route.params;
  const user = { email: "", Long: "", Lati: "" };
  const useer = { email: "", day: "", hour: "" };
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);

  const [time, setTime] = useState("");
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const sendTime = async () => {
    setIsStopwatchStart(false);
    setLoading(true);
    useer.email = worker.worker.worker.email;
    useer.day = date;
    useer.hour = time;
    await axios

      .put("https://masterway.herokuapp.com/workers/hours", useer)

      .then((resp) => {
        alert("Your shift has finished ");
        navigation.navigate("Home1");
      })
      .catch((err) => alert("There is problem"));
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const interval = setInterval(async () => {
        const ac = new AbortController();
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
      return () => {
        clearInterval(interval), ac.abort();
      };
    })();
  }, []);
  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Finish your shift "}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Your Shift has started Dont leave this page in the app in order to
          keep track of your hours
        </Text>

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
    backgroundColor: "#6f00ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03dac5",
    margin: 10,
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
    backgroundColor: "#6f00ff",
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
    backgroundColor: "#03dac5",
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#3700b3",
    marginLeft: 7,
  },
};

export default StartShift;
