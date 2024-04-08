import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { genres as getGenres } from "../../../apis/utils";
import GenreCard from "../../../components/common/GenreCard";
import { useNavigation } from "@react-navigation/native";
import Filter from "../../../components/common/Filter";

const GenresTab = () => {
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
  return (
    <>
      <Filter original={genres} input={filteredGenres} handleInputChange={handleGenresChange} />
      <ScrollView contentContainerStyle={styles.container}>
        {filteredGenres.length ? (
          filteredGenres.map((genre) => (
            <GenreCard
              genre={genre}
              onPress={() => {
                navigation.navigate("CollaborationGenre", { state: genre });
              }}
            />
          ))
        ) : (
          <Text>No Genres</Text>
        )}
      </ScrollView>
    </>
  );
};

export default GenresTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center",',
    gap: 20,
  },
});
