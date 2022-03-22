import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { NetworkContext } from "../../Context/NetworkContext";
import { StyleSheet } from "react-native";

const Shifts = ({ route, navigation }) => {
  const worker = React.useContext(NetworkContext);
  const SendShifts = () => {
    navigation.navigate("SendShifts", { worker: worker });
  };

  return (
    <SafeAreaView style={styles.bodyContent}>
      <Text style={styles.description}>
        Sunday: {worker.worker.weekShifts.Sun.hours}
      </Text>
      <Text style={styles.info}>Info: {worker.worker.weekShifts.Sun.info}</Text>

      <Text style={styles.description}>
        Monday: {worker.worker.weekShifts.Mon.hours}
      </Text>
      <Text style={styles.info}>Info: {worker.worker.weekShifts.Mon.info}</Text>
      <Text style={styles.description}>
        Tuesday: {worker.worker.weekShifts.Tue.hours}
      </Text>
      <Text style={styles.info}>Info: {worker.worker.weekShifts.Tue.info}</Text>
      <Text style={styles.description}>
        Wednesday: {worker.worker.weekShifts.Wed.hours}
      </Text>
      <Text style={styles.info}>Info: {worker.worker.weekShifts.Wed.info}</Text>
      <Text style={styles.description}>
        Thursday: {worker.worker.weekShifts.Thur.hours}
      </Text>
      <Text style={styles.info}>
        Info: {worker.worker.weekShifts.Thur.info}
      </Text>
      <Text style={styles.description}>
        Friday: {worker.worker.weekShifts.Fri.hours}
      </Text>
      <Text style={styles.info}>Info: {worker.worker.weekShifts.Fri.info}</Text>
      <Text style={styles.description}>
        Saturday: {worker.worker.weekShifts.Sat.hours}
      </Text>
      <Text style={styles.info}>Info: {worker.worker.weekShifts.Sat.info}</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={SendShifts}>
        <Text>Send your requested shifts</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    marginVertical: 10,
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
  },

  description: {
    fontSize: 16,
    color: "#696969",
    marginVertical: 10,
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
  buttonContainer1: {
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
export default Shifts;
