import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { Icon } from "react-native-elements";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/services/userSlice";
import EditProfile from "./screens/EditProfile";
import Notifications from "./screens/Notifications";
import Language from "./screens/Language";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const { user } = useSelector(selectUser);
  const myUserDetails = useSelector((state) => state.user.userDetails);
  const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);

  return (
    <LinearGradient
      colors={["rgba(56, 54, 54, 0)", "rgb(56,54,54)", "rgb(56,54,54)", "rgb(56,54,54)"]}
      style={[{ height: "100%", width: "100%" }]}
    >
      {/* Screens */}
      <EditProfile visible={editProfileVisible} setVisible={setEditProfileVisible} />
      <Notifications visible={notificationsVisible} setVisible={setNotificationsVisible} />
      <Language visible={languageVisible} setVisible={setLanguageVisible} />
      {/* Screens */}
      <ImageBackground
        style={[styles.profileImage, { height: height / 3, width: width }]}
        source={
          myUserDetails?.userImageUrl
            ? { uri: myUserDetails?.userImageUrl }
            : require(ProfileImagePlaceholder)
        }
      >
        <LinearGradient
          colors={[
            "rgba(56, 54, 54, 0)",
            "rgba(56, 54, 54, 0)",
            "rgba(56, 54, 54, 0.55)",
            "rgb(56,54,54)",
          ]}
          style={{ height: "100%", width: "100%" }}
        ></LinearGradient>
        <Text style={styles.profileName}>
          {user.firstName} {user.lastName}
        </Text>
      </ImageBackground>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <View style={styles.cardContainer}>
            <Pressable containerStyle={styles.card} onPress={() => setEditProfileVisible(true)}>
              <View style={styles.cardContent}>
                <Icon name="edit" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Edit profile information")}</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card} onPress={() => setNotificationsVisible(true)}>
              <View style={styles.cardContent}>
                <Icon name="notifications" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Notifications")}</Text>
                <Pressable>
                  <Text style={styles.cardTextRight}>{t("ON")}</Text>
                </Pressable>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card} onPress={() => setLanguageVisible(true)}>
              <View style={styles.cardContent}>
                <Icon name="language" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Language")}</Text>
                <Pressable>
                  <Text style={styles.cardTextRight}>{t("English")}</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.cardContainer}>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="lock" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Security")}</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="brightness-4" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Theme")}</Text>
                <Pressable>
                  <Text style={styles.cardTextRight}>{t("Light mode")}</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.cardContainer}>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="mail" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Help & Support")}</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="phone" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Contact Us")}</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="lock" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>{t("Privacy Policy")}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  profileImage: {},
  profileName: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: -50,
    marginLeft: 20,
  },
  section: {
    marginTop: 0,
    width: "100%",
    marginBottom: 200,
  },
  card: {
    backgroundColor: "transparent",
    padding: 8,
    borderWidth: 0,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  cardTextRight: {
    fontSize: 16,
    color: "rgba(0, 119, 255, 1)",
    marginLeft: 10,
  },
  icon: {
    marginRight: 16,
  },
  cardContainer: {
    margin: 20,
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 20,
  },
});

export default ScreenWrapper(Settings);
