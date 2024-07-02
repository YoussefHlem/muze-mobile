import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
  Pressable,
  useColorScheme,
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
import { useTheme } from "../../ThemeContext";
import styled from "styled-components/native";

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  padding: 16px;
  padding-top: 0;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
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
  margin-bottom: 200px;
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
  const myUserDetails = useSelector((state) => state.user.userDetails);
  const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <LinearGradient
      colors={["rgba(56, 54, 54, 0)", "rgb(56,54,54)", "rgb(56,54,54)", "rgb(56,54,54)"]}
      style={{ height: "100%", width: "100%" }}
    >
      <EditProfile visible={editProfileVisible} setVisible={setEditProfileVisible} />
      <Notifications visible={notificationsVisible} setVisible={setNotificationsVisible} />
      <Language visible={languageVisible} setVisible={setLanguageVisible} />

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
        ></LinearGradient>
        <ProfileName>
          {user.firstName} {user.lastName}
        </ProfileName>
      </ProfileImage>

      <ScrollContainer>
        <Section>
          <CardContainer>
            <Card onPress={() => setEditProfileVisible(true)}>
              <CardContent>
                <IconStyled name="edit" type="material" color="#fff" />
                <CardText>{t("Edit profile information")}</CardText>
              </CardContent>
            </Card>
            <Card onPress={() => setNotificationsVisible(true)}>
              <CardContent>
                <IconStyled name="notifications" type="material" color="#fff" />
                <CardText>{t("Notifications")}</CardText>
                <Pressable>
                  <CardTextRight>{t("ON")}</CardTextRight>
                </Pressable>
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
              <CardContent>
                <IconStyled name="lock" type="material" color="#fff" />
                <CardText>{t("Security")}</CardText>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <IconStyled name="brightness-4" type="material" color="#fff" />
                <CardText>{t("Theme")}</CardText>
                <Pressable onPress={toggleTheme}>
                  <CardTextRight>{t("Light mode")}</CardTextRight>
                </Pressable>
              </CardContent>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card>
              <CardContent>
                <IconStyled name="mail" type="material" color="#fff" />
                <CardText>{t("Help & Support")}</CardText>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <IconStyled name="phone" type="material" color="#fff" />
                <CardText>{t("Contact Us")}</CardText>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <IconStyled name="lock" type="material" color="#fff" />
                <CardText>{t("Privacy Policy")}</CardText>
              </CardContent>
            </Card>
          </CardContainer>
        </Section>
      </ScrollContainer>
    </LinearGradient>
  );
};

export default ScreenWrapper(Settings);
