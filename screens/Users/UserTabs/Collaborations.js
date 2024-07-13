// Libs
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Components
import CollabCard from "../../../components/common/CollabCard";

// Apis
import { searchedUserCollaborations } from "../../../apis/users";

const MyCollaborations = () => {
  const [myCollabs, setMyCollabs] = useState([]);
  const { user } = useSelector((state) => state.user.searchedUser);
  const { t } = useTranslation();

  const navigation = useNavigation();

  useEffect(() => {
    searchedUserCollaborations({
      userId: user.id,
    }).then((res) => setMyCollabs(res.data["User Collaborations"]));
  }, []);

  const handleViewDetails = (collab) => {
    navigation.navigate("CollaborationDetails", { collab });
  };

  const handleDeleteCollab = (collab) => {
    // Delete Endpoint
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.collabortaionWrapper}>
        {myCollabs.length ? (
          myCollabs.map((collab) => (
            <CollabCard
              key={collab.pk}
              item={collab}
              firstName={collab.joiningUser.length ? collab.joiningUser[0].username : null}
              title={collab?.title}
              location={collab.location}
              handleViewDetails={() => handleViewDetails()}
              handleDeleteCollab={() => handleDeleteCollab(collab)}
            />
          ))
        ) : (
          <Text>{t("No collaborations yet")}</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  collabortaionWrapper: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default MyCollaborations;
