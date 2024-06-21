import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
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
import { getAllDetails } from "../../apis/user";
import EditProfile from "./screens/EditProfile";

const Settings = () => {
  const { width, height } = useWindowDimensions();
  const { user } = useSelector(selectUser);
  const myUserDetails = useSelector((state) => state.user.userDetails);
  const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";
  const [EditProfileVisible, setEditProfileVisible] = useState(false);

  return (
    <LinearGradient
      colors={["rgba(56, 54, 54, 0)", "rgb(56,54,54)", "rgb(56,54,54)", "rgb(56,54,54)"]}
      style={[{ height: "100%", width: "100%" }]}
    >
      {/* Screens */}
      <EditProfile visible={EditProfileVisible} setVisible={setEditProfileVisible} />
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
                <Text style={styles.cardText}>Edit profile information</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="notifications" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Notifications</Text>
                <Pressable>
                  <Text style={styles.cardTextRight}>ON</Text>
                </Pressable>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="language" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Language</Text>
                <Pressable>
                  <Text style={styles.cardTextRight}>English</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.cardContainer}>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="lock" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Security</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="brightness-4" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Theme</Text>
                <Pressable>
                  <Text style={styles.cardTextRight}>Light mode</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
          <View style={styles.cardContainer}>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="mail" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Help & Support</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="phone" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Contact Us</Text>
              </View>
            </Pressable>
            <Pressable containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon name="lock" type="material" color="#fff" style={styles.icon} />
                <Text style={styles.cardText}>Privacy Policy</Text>
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
