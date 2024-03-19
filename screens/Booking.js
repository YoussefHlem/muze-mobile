import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../hoc/ScreenWrapper";
import { deleteItemAsync } from "expo-secure-store";
import { reloadAsync } from "expo-updates";

const Booking = () => {
  const reload = async () => {
    deleteItemAsync("accessToken");
    await reloadAsync();
  };
  return (
    <View>
      <Text>Booking</Text>
      <Button title="logout" onPress={reload} />
    </View>
  );
};

export default ScreenWrapper(Booking);

const styles = StyleSheet.create({});
