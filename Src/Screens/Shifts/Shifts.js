import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { NetworkContext } from "../../Context/NetworkContext";
import { StyleSheet } from "react-native";
import Custombutton from "../../Components/Custombutton";
import { useForm } from "react-hook-form";
/// page that contains the shifts of the worker of the week
const Shifts = ({ route, navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const worker = React.useContext(NetworkContext);
  /// cd to the send shifts page
  const SendShifts = () => {
    navigation.navigate("SendShifts", { worker: worker });
  };

  return (
    <ScrollView style={{ backgroundColor: "#6f00ff" }}>
      <SafeAreaView style={Styles.bodyContent}>
        <Text style={Styles.description}>
          Sunday:{"  "} {worker.worker.weekShifts.Sun.hours}
        </Text>
        <Text style={Styles.info}>
          Info: {"  "}
          {worker.worker.weekShifts.Sun.info}
        </Text>

        <Text style={Styles.description}>
          Monday:{"  "} {worker.worker.weekShifts.Mon.hours}
        </Text>
        <Text style={Styles.info}>
          Info: {"  "}
          {worker.worker.weekShifts.Mon.info}
        </Text>
        <Text style={Styles.description}>
          Tuesday: {"  "}
          {worker.worker.weekShifts.Tue.hours}
        </Text>
        <Text style={Styles.info}>
          Info: {"  "}
          {worker.worker.weekShifts.Tue.info}
        </Text>
        <Text style={Styles.description}>
          Wednesday: {"  "}
          {worker.worker.weekShifts.Wed.hours}
        </Text>
        <Text style={Styles.info}>
          Info:{"  "} {worker.worker.weekShifts.Wed.info}
        </Text>
        <Text style={Styles.description}>
          Thursday:{"  "} {worker.worker.weekShifts.Thur.hours}
        </Text>
        <Text style={Styles.info}>
          Info: {"  "}
          {worker.worker.weekShifts.Thur.info}
        </Text>
        <Text style={Styles.description}>
          Friday: {"  "}
          {worker.worker.weekShifts.Fri.hours}
        </Text>
        <Text style={Styles.info}>
          Info: {"  "}
          {worker.worker.weekShifts.Fri.info}
        </Text>
        <Text style={Styles.description}>
          Saturday:{"  "} {worker.worker.weekShifts.Sat.hours}
        </Text>
        <Text style={Styles.info}>
          Info:{"  "} {worker.worker.weekShifts.Sat.info}
        </Text>
        <Custombutton
          text="Send your requested shifts"
          onPress={handleSubmit(SendShifts)}
          type="SECONDARY"
        ></Custombutton>
      </SafeAreaView>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  body: {
    marginTop: 40,
  },
  bodyContent: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#6f00ff",
  },
  name: {
    marginTop: 10,
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 18,
    color: "#03dac5",
    fontWeight: "bold",
  },

  description: {
    fontSize: 18,
    color: "#03dac5",
    marginVertical: 10,
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
    backgroundColor: "#3f5bae",
  },
});
export default Shifts;
