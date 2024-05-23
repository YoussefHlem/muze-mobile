import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MuzeButton = ({ style, children, onPress, gradientStyle }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <LinearGradient
        colors={["#016299", "#f77599"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, gradientStyle]}
      >
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: "auto",
    alignItems: "center",
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 20,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default MuzeButton;
