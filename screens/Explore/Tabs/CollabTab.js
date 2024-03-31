import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { genres as getGenres } from "../../../apis/utils";
import CollabGenreCard from "../../../components/common/CollabGenreCard";

const CollabTab = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res.data.genres);
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {genres.map((genre) => (
        <CollabGenreCard genre={genre} />
      ))}
    </ScrollView>
  );
};

export default CollabTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center",',
    gap: 20,
  },
});
