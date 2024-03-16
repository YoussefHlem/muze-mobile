import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../hoc/ScreenWrapper";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default ScreenWrapper(Home);

const styles = StyleSheet.create({});
