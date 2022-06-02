import { SafeAreaView, Text, Image, StyleSheet } from "react-native";
import React from "react";
///  page to view the salary report image
const Showreports = ({ route, navigation }) => {
  const src = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "stretch",
        }}
        source={{ uri: src.file }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6f00ff",
  },
  header: {
    backgroundColor: "#3700b3",
    height: 200,
  },
  avatar: {
    width: 200,
    height: 500,
    // marginLeft: 3,
    // marginTop: 3,
  },
});
export default Showreports;
