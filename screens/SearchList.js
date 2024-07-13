import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ScreenWrapper from "../hoc/ScreenWrapper";
import ArtistCard from "../components/common/ArtistCard";
import { useSelector } from "react-redux";

const SearchList = () => {
  const Artists = useSelector((state) => state.search.searchResult);

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

export default ScreenWrapper(SearchList);

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
