import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { NetworkContext } from "../../Context/NetworkContext";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "react-hook-form";
import Custombutton from "../../Components/Custombutton";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const SendShifts = ({ route, navigation }) => {
  const worker = route.params;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sun, setSun] = useState("OFF");
  const [mon, setMon] = useState("OFF");
  const [tue, setTue] = useState("OFF");
  const [wed, setWed] = useState("OFF");
  const [thur, setThur] = useState("OFF");
  const [fri, setFri] = useState("OFF");
  const [sat, setSat] = useState("OFF");
  const user = {
    Sun: "",
    Mon: "",
    Tue: "",
    Wed: "",
    Thur: "",
    Fri: "",
    Sat: "",
    email: "",
  };
  const onSendPress = async () => {
    user.Sun = sun;
    user.Mon = mon;
    user.Tue = tue;
    user.Wed = wed;
    user.Thur = thur;
    user.Fri = fri;
    user.Sat = sat;
    user.email = worker.worker.worker.email;
    setLoading(true);

    await axios

      .put("https://masterway.herokuapp.com/workers/app/send", user)

      .then((resp) => {
        alert("Your Shift was send ");
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
        textContent={"Sending Shifts...."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text styles={styles.name}>Sunday</Text>

        <Picker
          selectedValue={sun}
          onValueChange={(itemValue, itemIndex) => setSun(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Text styles={styles.name}>Monday</Text>

        <Picker
          selectedValue={mon}
          onValueChange={(itemValue, itemIndex) => setMon(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Text styles={styles.name}>Tuesday</Text>

        <Picker
          selectedValue={tue}
          onValueChange={(itemValue, itemIndex) => setTue(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Text styles={styles.name}>Wednesday</Text>

        <Picker
          selectedValue={wed}
          onValueChange={(itemValue, itemIndex) => setWed(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Text styles={styles.name}>Thursday</Text>

        <Picker
          selectedValue={thur}
          onValueChange={(itemValue, itemIndex) => setThur(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Text styles={styles.name}>Friday</Text>

        <Picker
          selectedValue={fri}
          onValueChange={(itemValue, itemIndex) => setFri(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Text styles={styles.name}>Saturday</Text>

        <Picker
          selectedValue={sat}
          onValueChange={(itemValue, itemIndex) => setSat(itemValue)}
        >
          <Picker.Item label="OFF" value="OFF" />
          <Picker.Item label="6:00-16:00" value="6:00-16:00" />
          <Picker.Item label="16:00-00:00" value="16:00-00:00" />
          <Picker.Item label="00:00-06:00" value="00:00-06:00" />
          <Picker.Item label="ALL DAY" value="ALL DAY" />
        </Picker>
        <Custombutton
          text="Send your shifts"
          onPress={handleSubmit(onSendPress)}
          type="FORTH"
        ></Custombutton>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    fontSize: 30,
  },
  name: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 45,
    color: "#696969",
    fontWeight: "600",
  },
  bodyContent: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default SendShifts;
