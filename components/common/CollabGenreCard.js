import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CollaborationBg = require("../../assets/Images/cards/collaboration-bg.png");
const Collaboration = require("../../assets/Images/cards/collaboration.jpg");

const CollabGenreCard = ({ genre }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const authToken = useSelector((state) => state.user.authToken);

  const handleClick = () => {
    if (!authToken) {
      navigation.navigate("Signin");
    }
    navigation.navigate("CollaborationsGenre", { genre });
  };

  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <Image source={Collaboration} style={styles.collabImage} />
      <ImageBackground source={CollaborationBg} style={styles.collabType}>
        <View style={styles.collabInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.collabName}>{t(genre)}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

CollabGenreCard.propTypes = {
  genre: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 10,
  },
  collabImage: {
    width: 120,
    borderRadius: 8,
  },
  collabType: {
    width: 170,
    height: 100,
    borderRadius: 5,
  },
  collabInfo: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
  },
  collabName: {
    fontWeight: "400",
    fontSize: 22,
    lineHeight: 28,
    color: "#ffffff",
    textAlign: "center",
  },
  collabDesc: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 0.55)",
  },
});

export default CollabGenreCard;
