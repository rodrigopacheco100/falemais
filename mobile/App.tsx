import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Landing from "./src/pages/Landing";

export default function App() {
  return (
    <View style={styles.container}>
      <Landing />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
});
