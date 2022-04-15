import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import ButtonSpinner from "react-native-button-spinner";

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
  container_PRIMARY: { backgroundColor: "#3f5bae" },
  container_SECONDARY: { backgroundColor: "#a56ca7" },
  container_TERTIARY: { backgroundColor: "#feeb10" },
  container_FORTH: { backgroundColor: "#3f5bae" },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text_PRIMARY: {
    color: "white",
    fontSize: 18,
  },
  text_SECONDARY: { color: "black", fontSize: 18 },
  text_TERTIARY: {
    color: "black",
    fontSize: 18,
  },
  text_FORTH: {
    color: "black",
    fontSize: 18,
  },
});

export default CustomButton;
