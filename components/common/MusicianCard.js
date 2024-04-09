import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Pressable, StyleSheet, Text } from "react-native";

const MusicianCard = ({ type, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <LinearGradient colors={["#016299", "#f77599"]} style={styles.gradient}>
        <Text style={styles.type}>{type}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff21",
    borderRadius: 30,
    marginTop: 10,
    minWidth: 180,
    marginBottom: 20,
  },
  gradient: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
  },
  type: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
  },
});

export default MusicianCard;
