import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import Search from "./Search";

const TheNavbar = () => {
  return (
    <ImageBackground
      source={require("../../assets/Images/navbar/navbar-dark-background.png")}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.content}>
        <Image
          source={require("../../assets/Images/navbar/navbar-mobile-logo.png")}
        />
        <View>
          <Search />
        </View>
        <View style={styles.iconsContainer}>
          <Image source={require("../../assets/Images/navbar/bell.png")} />
          <Image
            source={require("../../assets/Images/navbar/notifications.png")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default TheNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    zIndex: 99,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 35,
  },
  backgroundImage: {
    resizeMode: "stretch",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
