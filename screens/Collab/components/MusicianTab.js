import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { skills } from "../../../apis/utils";
import { setSkillsList } from "../../../store/services/utilsSlice";
import MusicianCard from "../../../components/common/MusicianCard";
import Filter from "../../../components/common/Filter";

const MusicianTab = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [musicians, setMusicians] = useState([]);
  const [filteredMusicians, setFilteredMusicians] = useState([]);

  const handleMusicianChange = (arr) => {
    setFilteredMusicians(arr);
  };

  useEffect(() => {
    skills().then((res) => {
      setSkillsList(res.data.skills);
      setMusicians(res.data.skills);
      setFilteredMusicians(res.data.skills);
    });
  }, []);

  const renderMusician = ({ item }) => (
    <MusicianCard
      type={item}
      onPress={() => {
        navigate("CollabOnMusicans", { state: item });
      }}
    />
  );

  return (
    <View>
      <Filter
        original={musicians}
        input={filteredMusicians}
        handleInputChange={handleMusicianChange}
      />
      <Text style={{ color: "#fff", fontSize: 18, marginLeft: 18 }}>Musicians</Text>
      <FlatList
        horizontal
        data={filteredMusicians}
        renderItem={renderMusician}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <Text style={{ color: "#fff" }}>No Musicians</Text>}
        contentContainerStyle={styles.scrollViewContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});

export default MusicianTab;
