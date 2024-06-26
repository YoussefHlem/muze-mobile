// Components
import { View, StyleSheet, ImageBackground, Image, Text, Pressable } from "react-native";
import Search from "./Search";
import { useNavigation } from "@react-navigation/native";

// Assets
const navbarBackground = require("../../assets/Images/navbar/navbar-dark-background.png");
const navbarLogo = require("../../assets/Images/navbar/navbar-mobile-logo.png");
const navbarBellIcon = require("../../assets/Images/navbar/bell.png");
const navbarNotificationIcon = require("../../assets/Images/navbar/notifications.png");

const TheNavbar = () => {
  const { navigate } = useNavigation();
  return (
    <ImageBackground
      source={navbarBackground}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.content}>
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
            width: 70,
            height: 70,
            position: "absolute",
            left: -20,
          }}
        />
        <View>
          <Search />
        </View>
        <View style={styles.iconsContainer}>
          <Image source={navbarBellIcon} />
          <Pressable onPress={() => navigate("Messaging")}>
            <Image source={navbarNotificationIcon} />
          </Pressable>
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
