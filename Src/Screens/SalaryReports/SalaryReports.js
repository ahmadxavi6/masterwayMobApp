import {
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { NetworkContext } from "../../Context/NetworkContext";
import Custombutton from "../../Components/Custombutton";
import { useForm } from "react-hook-form";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
/// page that get the salary reports from the database based on the year selected
const MounthHours = ({ route, navigation }) => {
  const worker = React.useContext(NetworkContext);

  const [ye, setYe] = useState("2022");

  let inUser = {
    date: ye,
  };
  const [user, setUser] = useState(inUser);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [arr, setArr] = useState("");
  /// cd to show report page
  const onSendPress = (e) => {
    navigation.navigate("ShowReports", { file: e.item.file });
  };
  /// get the salary reports from the database based on the year picked
  useEffect(async () => {
    user.date = ye;

    await axios
      .patch(
        `https://masterway.herokuapp.com/hoursreport/${worker.worker._id}`,
        user
      )
      .then((resp) => {
        setArr(resp.data);
      })
      .catch((err) => alert("There  is a problem"));
  }, [ye]);

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={ye}
        style={{ color: "#feeb10" }}
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

      <FlatList
        data={arr}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.item}>
            <Text style={styles.title}>
              {item.date} :{" "}
              <MaterialCommunityIcons
                onPress={() => {
                  onSendPress({ item });
                }}
                style={styles.icon}
                name="eye"
                size={30}
              />
            </Text>
          </SafeAreaView>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6f00ff",
  },
  avatar: {
    width: 130,
    height: 130,
  },
  item: {
    backgroundColor: "#3700b3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: "#03dac5",
  },
  end: {
    fontSize: 16,
    color: "#03dac5",
  },

  x: {
    fontSize: 18,
    color: "#3700b3",
  },
});

export default MounthHours;
