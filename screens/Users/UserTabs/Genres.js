import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import GenreCard from "../../../components/common/GenreCard";

const Genres = () => {
  const { genres } = useSelector((state) => state.user.searchedUser);
  const img =
    "https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863";

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {genres.length ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre.name}
              genreImage={img}
              genreBackgroundColor={"#e8125b"}
            />
          ))}
        </View>
      ) : (
        <Text
          style={{
            color: "black",
            fontWeight: "600",
            fontSize: 20,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          {t("No Genres yet")}
        </Text>
      )}
    </ScrollView>
  );
};

export default Genres;
