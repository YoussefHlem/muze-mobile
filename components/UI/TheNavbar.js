import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchModal from "./SearchModal"; // Adjust the path as necessary

// Assets
const navbarLogo = require("../../assets/Images/navbar/navbar-mobile-logo.png");
const searchIcon = require("../../assets/Images/navbar/SearchIcon.png");
const bellIcon = require("../../assets/Images/navbar/bell.png");
const notificationIcon = require("../../assets/Images/navbar/notifications.png");

const TheNavbar = () => {
  const { navigate } = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={navbarLogo}
        style={{
          width: 35,
          height: 40,
          opacity: 0,
        }}
      />
      <Image
        source={navbarLogo}
        style={{
          width: 125,
          height: 125,
          position: "absolute",
          left: 10,
        }}
      />
      <View style={styles.iconsContainer}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Image source={searchIcon} style={styles.icon} />
        </Pressable>
        <Image source={bellIcon} style={styles.icon} />
        <Pressable onPress={() => navigate("Messaging")}>
          <Image source={notificationIcon} style={styles.icon} />
        </Pressable>
      </View>

      <SearchModal visible={isModalVisible} setVisible={setIsModalVisible} />
    </View>
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
    paddingHorizontal: 10,
    marginTop: 35,
    backgroundColor: "transparent", // Adding a background color for better visibility
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
  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff", // Assuming you want white icons to fit the dark background
  },
});
