import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { genres as getGenres } from "../../../apis/utils";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import GenreCard from "../../../components/common/GenreCard";
import Filter from "../../../components/common/Filter";

const GenresTab = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);

  const handleGenresChange = (arr) => {
    setFilteredGenres(arr);
  };

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res.data.genres);
      setFilteredGenres(res.data.genres);
    });
  }, []);

  const renderGenre = ({ item }) => (
    <GenreCard
      genre={item}
      onPress={() => navigation.navigate("CollabOnGeners", { state: item })}
    />
  );

  return (
    <>
      <Filter original={genres} input={filteredGenres} handleInputChange={handleGenresChange} />
      <Text style={{ color: "#fff", fontSize: 18, marginLeft: 18 }}>{t("Genres")}</Text>
      <FlatList
        horizontal
        data={filteredGenres}
        renderItem={renderGenre}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>{t("No Genres")}</Text>}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});

export default GenresTab;
