import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { getAllArtists } from "../../../apis/search";
import ArtistCard from "../../../components/common/ArtistCard";
import { getAuthToken } from "../../../utils/AuthToken";

const PopularArtistsTab = () => {
  const [Artists, setArtists] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    (async () => {
      const authToken = await getAuthToken();
      setAuthToken(authToken);
    })();

    getAllArtists().then((res) => {
      setArtists(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={Artists}
        renderItem={({ item }) => (
          <React.Fragment key={item.user.id}>
            <ArtistCard artist={item} id={item.user.id} />
          </React.Fragment>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default PopularArtistsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
});
