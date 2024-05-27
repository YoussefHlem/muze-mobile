// Libs
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CollabCard from "../../../components/common/CollabCard";
import MyCollabCard from "../../../components/common/MyCollabCard";

// Redux

// APIs
import { collaborationListAll, collaborationRequests } from "../../../apis/collaboration";

const CollabTab = () => {
  const [allCollab, setAllCollab] = useState([]);
  const [myCollab, setMyCollab] = useState([]);

  useEffect(() => {
    collaborationListAll().then((res) => setAllCollab(res?.data["All Collaborations"]));
    collaborationRequests().then((res) =>
      setMyCollab(res?.data["received requests (own's requests filtered)"])
    );
  }, []);
  return (
    <>
      <View>
        <Text style={styles.heading}>LISTED COLLABORATIONS</Text>
        <View>
          {allCollab.map((collab) => (
            <CollabCard
              key={collab.pk}
              item={collab}
              firstName={collab?.requestingUser?.firstName}
              lastName={collab?.requestingUser?.lastName}
              title={collab?.title}
              location={collab?.location}
            />
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.heading}>MY COLLABORATION REQUESTS</Text>
        <View>
          {myCollab.map((collab) => (
            <MyCollabCard
              key={collab.pk}
              item={collab}
              firstName={collab?.requestingUser?.firstName}
              lastName={collab?.requestingUser?.lastName}
              title={collab?.title}
              location={collab?.location}
              setCollabRequestData={setMyCollab}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default CollabTab;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 20,
  },
});