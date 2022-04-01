import { Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const MounthHours = ({ route, navigation }) => {
  const worker = route.params;

  const d = new Date();
  let s = d.getMonth() + 1;
  let y = d.getFullYear();
  const [ye, setYe] = useState(y);
  const [mo, setMo] = useState("1");

  let inUser = {
    email: worker.worker.worker.email,
    month: "/" + mo + "/" + ye,
  };
  const [user, setUser] = useState(inUser);

  let min = 0;
  let sec = 0;
  let hour1 = 0;
  let tempsec = 0;
  let tempmin = 0;
  let temphour = 0;
  const [arr, setArr] = useState("");

  useEffect(async () => {
    user.email = worker.worker.worker.email;
    user.month = "/" + mo + "/" + ye;
    console.log(user);
    await axios
      .patch("https://masterway.herokuapp.com/workers/hours/", user)
      .then((resp) => {
        setArr(resp.data.hours);
      })
      .catch((err) => alert("There  is a problem"));
  }, [mo, ye]);

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
      <Picker
        selectedValue={ye}
        onValueChange={(itemValue, itemIndex) => {
          setYe(itemValue);
        }}
      >
        <Picker.Item label="2022" value="2022" />
        <Picker.Item label="2023" value="2023" />
        <Picker.Item label="2024" value="2024" />
        <Picker.Item label="2025" value="2025" />
        <Picker.Item label="2026" value="2026" />
      </Picker>
      <Picker
        selectedValue={mo}
        onValueChange={(itemValue, itemIndex) => setMo(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
      </Picker>

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
