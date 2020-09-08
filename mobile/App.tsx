import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import Landing from "./src/pages/Landing";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Landing />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
});
