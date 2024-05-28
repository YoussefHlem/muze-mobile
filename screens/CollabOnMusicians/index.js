// Libs
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

// Components
import CollabCard from "../../components/common/CollabCard";
import ScreenWrapper from "../../hoc/ScreenWrapper";

// APIs
import { listCollaborationOnSkills } from "../../apis/collaboration";

const CollabOnMusicians = () => {
  const route = useRoute();
  const { state } = route.params;

  const [collabs, setCollabs] = useState([]);

  useEffect(() => {
    listCollaborationOnSkills({
      lookingForSkill: [state],
    }).then((res) => setCollabs(res.data["matching collaborations (own's requests filtered)"]));
  }, []);

  return (
    <>
      <View>
        <Text style={styles.heading}>LISTED COLLABORATIONS</Text>
        <ScrollView style={{ marginBottom: 200 }}>
          {collabs?.map((collab) => (
            <CollabCard
              key={collab.pk}
              item={collab}
              firstName={collab?.requestingUser?.firstName}
              lastName={collab?.requestingUser?.lastName}
              title={collab?.title}
              location={collab?.location}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ScreenWrapper(CollabOnMusicians);

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: "#fff",
    marginTop: 30,
    textAlign: "center",
  },
});
