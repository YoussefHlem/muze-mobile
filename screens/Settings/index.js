import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  Pressable,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/services/userSlice";
import EditProfile from "./screens/EditProfile";
import Language from "./screens/Language";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../ThemeContext";
import styled from "styled-components/native";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import ChangePassword from "./screens/ChangePassword";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  padding: 16px;
  padding-top: 0;
`;

const ProfileImage = styled(ImageBackground)`
  height: ${(props) => props.height / 3}px;
  width: ${(props) => props.width}px;
`;

const ProfileName = styled(Text)`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin-top: -50px;
  margin-left: 20px;
`;

const Section = styled(View)`
  margin-top: 0;
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 150px;
`;

const Card = styled(Pressable)`
  background-color: transparent;
  padding: 8px;
  border-width: 0;
  border-radius: 10px;
`;

const CardContent = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const CardText = styled(Text)`
  flex: 1;
  font-size: 16px;
  color: #fff;
`;

const CardTextRight = styled(Text)`
  font-size: 16px;
  color: rgba(0, 119, 255, 1);
  margin-left: 10px;
`;

const IconStyled = styled(Icon)`
  margin-right: 16px;
`;

const CardContainer = styled(View)`
  margin: 20px;
  background-color: #121212;
  border-radius: 20px;
`;

const Settings = () => {
  const { toggleTheme } = useTheme();
  const theme = useColorScheme();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const { user } = useSelector(selectUser);
  const { navigate } = useNavigation();
  const myUserDetails = useSelector((state) => state.user.userDetails);
  const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  // Bottom Sheet configuration
  const snapPoints = useMemo(() => ["60%", "60%", "85%", "100%"], []);
  const bottomSheetRef = React.useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationsEnabled(status === "granted");
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(
            t("Permission denied"),
            t("Please enable notifications in settings."),
          );
          return;
        }
      } else {
        Toast.show({ type: "success", text1: "Notifications Enabled" });
      }
    }
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <LinearGradient
      colors={[
        "rgba(56, 54, 54, 0)",
        "rgb(56,54,54)",
        "rgb(56,54,54)",
        "rgb(56,54,54)",
      ]}
      style={{ height: "100%", width: "100%" }}
    >
      <EditProfile
        visible={editProfileVisible}
        setVisible={setEditProfileVisible}
      />
      <Language visible={languageVisible} setVisible={setLanguageVisible} />
      <ChangePassword
        visible={changePasswordVisible}
        setVisible={setChangePasswordVisible}
      />

      <ProfileImage
        style={{ height: height / 3, width: width }}
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
        >
          <ProfileName>
            {user.firstName} {user.lastName}
          </ProfileName>
        </LinearGradient>
      </ProfileImage>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: "rgb(56,54,54)",
        }}
      >
        <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Section>
            <CardContainer>
              <Card onPress={() => setEditProfileVisible(true)}>
                <CardContent>
                  <IconStyled name="edit" type="material" color="#fff" />
                  <CardText>{t("Edit profile information")}</CardText>
                </CardContent>
              </Card>
              <Card onPress={toggleNotifications}>
                <CardContent>
                  <IconStyled
                    name="notifications"
                    type="material"
                    color="#fff"
                  />
                  <CardText>{t("Notifications")}</CardText>
                  <CardTextRight>
                    {notificationsEnabled ? t("ON") : t("OFF")}
                  </CardTextRight>
                </CardContent>
              </Card>
              <Card onPress={() => setLanguageVisible(true)}>
                <CardContent>
                  <IconStyled name="language" type="material" color="#fff" />
                  <CardText>{t("Language")}</CardText>
                  <Pressable>
                    <CardTextRight>{t("English")}</CardTextRight>
                  </Pressable>
                </CardContent>
              </Card>
            </CardContainer>

            <CardContainer>
              <Card>
                <Pressable onPress={() => setChangePasswordVisible(true)}>
                  <CardContent>
                    <IconStyled name="lock" type="material" color="#fff" />
                    <CardText>{t("Security")}</CardText>
                  </CardContent>
                </Pressable>
              </Card>
              <Card>
                <CardContent>
                  <IconStyled
                    name="brightness-4"
                    type="material"
                    color="#fff"
                  />
                  <CardText>{t("Theme")}</CardText>
                  <Pressable onPress={toggleTheme}>
                    <CardTextRight>{t("Light mode")}</CardTextRight>
                  </Pressable>
                </CardContent>
              </Card>
            </CardContainer>

            <CardContainer>
              <Card onPress={() => navigate("HelpSupport")}>
                <CardContent>
                  <IconStyled name="mail" type="material" color="#fff" />
                  <CardText>{t("Help & Support")}</CardText>
                </CardContent>
              </Card>
              <Card
                onPress={() => Linking.openURL("mailto:info@muze-network.com")}
              >
                <CardContent>
                  <IconStyled name="phone" type="material" color="#fff" />
                  <CardText>{t("Contact Us")}</CardText>
                </CardContent>
              </Card>
              <Card onPress={() => navigate("PrivacyPolicy")}>
                <CardContent>
                  <IconStyled name="lock" type="material" color="#fff" />
                  <CardText>{t("Privacy Policy")}</CardText>
                </CardContent>
              </Card>
            </CardContainer>
          </Section>
        </BottomSheetScrollView>
      </BottomSheet>
    </LinearGradient>
  );
};

export default ScreenWrapper(Settings);
