// Libs
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

// Apis
import { useDispatch } from "react-redux";

// Redux
import { useNavigation } from "@react-navigation/core";
import { skills } from "../../../apis/utils";
import { setSkillsList } from "../../../store/services/utilsSlice";
import MusicianCard from "../../../components/common/MusicianCard";
import Filter from "../../../components/common/Filter";

const MusicianTab = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [musicians, setMusicians] = useState([]);
  const [filterdMusicians, setFilteredMusicians] = useState([]);

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
  return (
    <View>
      <Filter
        original={musicians}
        input={filterdMusicians}
        handleInputChange={handleMusicianChange}
      />
      <ScrollView contentContainerStyle={styles.posts}>
        {filterdMusicians.length ? (
          filterdMusicians.map((musician, index) => (
            <MusicianCard
              type={musician}
              onPress={() => navigate("CollaborationMusican", { state: musician })}
            />
          ))
        ) : (
          <Text style={{ color: "#fff" }}>No Musicians</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MusicianTab;

const styles = StyleSheet.create({
  posts: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
