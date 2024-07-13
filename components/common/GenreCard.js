import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useTranslation } from "react-i18next";

const genreCardsImages = [
  require("../../assets/Images/collaborations/matthew-ball-Pr1e8z1ZocI-unsplash.jpg"),
  require("../../assets/Images/collaborations/guilherme-stecanella-O7tDSkEA_t4-unsplash.jpg"),
  require("../../assets/Images/collaborations/sebastien-chiron-0LYMnySgTK4-unsplash.jpg"),
  require("../../assets/Images/collaborations/matthew-ball-Pr1e8z1ZocI-unsplash.jpg"),
];

const genreBackgroundColors = ["#e8125b", "#55a891", "#f038a5", "#509bf5"];

const GenreCard = ({ genre, onPress }) => {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: genreBackgroundColors[Math.floor(Math.random() * 4)],
        borderRadius: 20,
        justifyContent: "space-between",
        width: 135,
        height: 135,
        padding: 10,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          color: "#ffffff",
          marginLeft: "5%",
        }}
      >
        {t(genre)}
      </Text>
      <Image
        source={genreCardsImages[Math.floor(Math.random() * 4)]}
        style={{
          height: 100,
          width: 100,
          alignSelf: "flex-end",
          position: "absolute",
          right: "-25%",
          bottom: "-25%",
          zIndex: -1,
          transform: "rotate(40deg)",
        }}
      />
    </Pressable>
  );
};

export default GenreCard;
