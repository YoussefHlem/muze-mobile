import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { getAllArtists } from "../../../apis/search";
import ArtistCard from "../../../components/common/ArtistCard";

const PopularArtistsTab = () => {
  const [Artists, setArtists] = useState([]);

  useEffect(() => {
    getAllArtists().then((res) => {
      setArtists(res.data);
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.posts}>
      {Artists.map((artist) => (
        <ArtistCard artist={artist} id={artist.user} key={artist.user} />
      ))}
    </ScrollView>
  );
};

export default PopularArtistsTab;

const styles = StyleSheet.create({
  posts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center",',
    gap: 18,
  },
});
