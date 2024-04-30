import { FlatList, StyleSheet, View } from "react-native";
import ArtistCard from "../../../components/common/ArtistCard";
import { getFollowing } from "../../../apis/user";
import { useEffect, useState } from "react";

const Following = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getFollowing().then((res) => {
      setFollowers(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        renderItem={({ item }) => <ArtistCard artist={item} id={item.user} key={item.user} />}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  flatListContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginTop: 20,
  },
});
