import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NetworkContext } from "../../Context/NetworkContext";
import Custombutton from "../../Components/Custombutton";
import React, { useState } from "react";
/// home page that contain start shift and workers hours
const Home1 = ({ route, navigation }) => {
  const worker = React.useContext(NetworkContext);
  const [has, setHas] = useState(false);
  const [counter, setCounter] = useState(false);
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  if (
    today.getDay() == 0 &&
    has !== true &&
    worker.worker.weekShifts.Sun.hours !== ""
  ) {
    setHas(true);
  }
  if (
    today.getDay() == 1 &&
    has !== true &&
    worker.worker.weekShifts.Mon.hours !== ""
  ) {
    setHas(true);
  }
  if (
    today.getDay() == 2 &&
    has !== true &&
    worker.worker.weekShifts.Tue.hours !== ""
  ) {
    setHas(true);
  }
  if (
    today.getDay() == 3 &&
    has !== true &&
    worker.worker.weekShifts.Wed.hours !== ""
  ) {
    setHas(true);
  }
  if (
    today.getDay() == 4 &&
    has !== true &&
    worker.worker.weekShifts.Thur.hours !== ""
  ) {
    setHas(true);
  }
  if (
    today.getDay() == 5 &&
    has !== true &&
    worker.worker.weekShifts.Fri.hours !== ""
  ) {
    setHas(true);
  }
  if (
    today.getDay() == 6 &&
    has !== true &&
    worker.worker.weekShifts.Sat.hours !== ""
  ) {
    setHas(true);
  }
  /// move the start shift screen
  const startShiftPressed = async () => {
    if (has === true && counter === false) {
      setCounter(true);
      navigation.navigate("StartShift", { worker: worker });
    } else if (has == true) {
      alert("You have already finished your shift");
    } else {
      alert("You dont have a shift today");
    }
  };
  /// cd to works hours page
  const workHours = async () => {
    navigation.navigate("MounthHours", { worker: worker });
  };
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.name}>Welcome Back {worker.worker.fName}</Text>
      <Text style={styles.name}>{date}</Text>
      <View style={styles.sectionStyle}>
        <Custombutton
          type="SECONDARY"
          onPress={startShiftPressed}
          text="Start Your Shift "
        ></Custombutton>
        <Custombutton
          type="PRIMARY"
          onPress={workHours}
          text="Month Work Hours "
        ></Custombutton>
      </View>
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
  sectionStyle: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03dac5",
    margin: 10,
  },
  body: {
    backgroundColor: "#6f00ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContent: {
    alignItems: "center",
    padding: 30,
  },

  info: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
  },

  description: {
    fontSize: 16,
    color: "black",
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
export default Home1;
