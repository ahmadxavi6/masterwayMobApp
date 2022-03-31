import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Custombutton from "../../Components/Custombutton";

const MounthHours = ({ route, navigation }) => {
  const worker = route.params;
  user = { email: "", month: "" };
  let total = 5;
  let min = 0;
  let sec = 0;
  let hour1 = 0;
  let tempsec = 0;
  let tempmin = 0;
  let temphour = 0;
  user.email = worker.worker.worker.email;
  const [arr, setArr] = useState("");
  const d = new Date();
  let s = d.getMonth() + 1;
  user.month = "/" + s + "/";
  useEffect(async () => {
    await axios
      .patch("https://masterway.herokuapp.com/workers/hours/", user)
      .then((resp) => {
        setArr(resp.data.hours);
      })
      .catch((err) => alert("The code is not correct"));
  }, []);
  for (let i = 0; i < arr.length; i++) {
    tempsec =
      tempsec + parseInt(arr[i].hour[6]) * 10 + parseInt(arr[i].hour[7]);
    tempmin =
      tempmin + parseInt(arr[i].hour[3]) * 10 + parseInt(arr[i].hour[4]);
    temphour =
      temphour + parseInt(arr[i].hour[0]) * 10 + parseInt(arr[i].hour[1]);
  }
  while (tempsec >= 60) {
    tempsec = tempsec - 60;
    tempmin = tempmin + 1;
  }
  sec = tempsec;
  while (tempmin >= 60) {
    tempmin = tempmin - 60;
    temphour = temphour + 1;
  }
  min = tempmin;
  hour1 = temphour;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arr}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.item}>
            <Text style={styles.title}>
              {item.day} :{" "}
              {item.hour[0] +
                item.hour[1] +
                item.hour[2] +
                item.hour[3] +
                item.hour[4] +
                item.hour[5] +
                item.hour[6] +
                item.hour[7]}
            </Text>
          </SafeAreaView>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <SafeAreaView style={styles.item}>
        <Text style={styles.end}>Total work hours this month :</Text>
        <Text style={styles.end}>
          {hour1} hours {min} minutes {sec} seconds
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#00BFFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
  end: {
    fontSize: 16,
  },
});

export default MounthHours;
