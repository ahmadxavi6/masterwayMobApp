import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: { backgroundColor: "#3700b3" },
  container_SECONDARY: { backgroundColor: "#03dac5" },
  container_TERTIARY: { backgroundColor: "#feeb10" },
  container_FORTH: { backgroundColor: "red" },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text_PRIMARY: {
    color: "#03dac5",
    fontSize: 18,
  },
  text_SECONDARY: { color: "#3700b3", fontSize: 18 },
  text_TERTIARY: {
    color: "black",
    fontSize: 18,
  },
  text_FORTH: {
    color: "#3700b3",
    fontSize: 18,
  },
});

export default CustomButton;
