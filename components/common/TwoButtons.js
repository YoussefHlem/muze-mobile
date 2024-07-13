import React from "react";
import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TwoButtons = ({ onePress1, onPress2, text1, text2 }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onePress1} style={styles.messageButton}>
        <Text style={styles.messageButtonText}>{text1}</Text>
      </Pressable>
      <Pressable onPress={onPress2} style={styles.followButton}>
        <ImageBackground
          source={require("../../assets/Images/gradient.png")}
          style={styles.gradientBackground}
        >
          <Text style={styles.followButtonText}>{text2}</Text>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  messageButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 15,
    position: "relative",
    zIndex: 2,
    transform: "translateX(25px)",
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  followButton: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    transform: "translateX(-25px)",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TwoButtons;
