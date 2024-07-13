import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, FlatList, Pressable } from "react-native";
import ArtistCard from "../common/ArtistCard";
import { useSelector, useDispatch } from "react-redux";
import { setSearchList, setSearchResult } from "../../store/services/searchSlice";

const SearchModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const data = useSelector((state) => state.search.allArtists);
  const searchResults = useSelector((state) => state.search.searchList);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length <= 5) {
      const list = data?.filter((d) => {
        let fullName = `${d?.firstName} ${d?.lastName}`;
        return fullName.toLowerCase().includes(query.toLowerCase());
      });
      dispatch(setSearchList(list));
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => setVisible(false)} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<-"}</Text>
          </Pressable>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={() => Math.random().toString(32)}
          renderItem={({ item }) => (
            <React.Fragment key={item.user.id}>
              <ArtistCard artist={item} id={item.user.id} />
            </React.Fragment>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.resultsContainer}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#171717",
    paddingTop: 40, // To avoid the status bar area on some devices
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: "#222",
  },
  resultsContainer: {
    padding: 10,
  },
  separator: {
    height: 20, // Adjust this value for more or less space between items
  },
});

export default SearchModal;
