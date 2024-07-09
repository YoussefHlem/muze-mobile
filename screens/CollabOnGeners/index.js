// Libs

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Components
import CollabCard from "../../components/common/CollabCard";
import ScreenWrapper from "../../hoc/ScreenWrapper";

// APIs
import { listCollaborationOnGenres } from "../../apis/collaboration";

const CollabOnMusicians = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const { state } = route.params;

  const [collabs, setCollabs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      listCollaborationOnGenres({
        genre: [state],
      }).then((res) => {
        setCollabs(res.data["matching collaborations on genres (own's requests filtered)"]);
        console.log(res.data["matching collaborations on genres (own's requests filtered)"]);
      });
    }, [])
  );

  return (
    <>
      <View>
        <Text style={styles.heading}>{t("LISTED COLLABORATIONS")}</Text>
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
