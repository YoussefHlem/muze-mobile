import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenWrapper from "../../hoc/ScreenWrapper";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Linking,
} from "react-native";
import Toast from "react-native-toast-message";
import ArtistCard from "../../components/common/ArtistCard";
import { MuzeButton } from "../../components";

import { collaborationDetail, collaborationJoin } from "../../apis/collaboration";
import { getSearchedUserDetails } from "../../apis/user";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setSearchedUserDetails } from "../../store/services/userSlice";

const CollaborationDetails = () => {
  const route = useRoute();
  const { state } = route.params || {};
  const { user } = useSelector(selectUser);
  const { requestingUser } = state;
  const { pk } = state;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [collabData, setCollabData] = useState([]);
  const [joiningUsers, setJoiningUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMyCollab = requestingUser === user?.pk;

  const onCollabClick = () => {
    collaborationJoin({ collabToJoinId: pk }).then((response) => {
      if (!response.error) {
        Toast.show({ type: "success", text1: "Collaboration joined successfully" });
      }
    });
  };

  const handleViewProfile = () => {
    getSearchedUserDetails({ profileId: requestingUser.id })
      .then((res) => {
        if (res.data["Profile Details"].user.id === pk) {
          navigation.navigate("Profile");
        } else {
          dispatch(setSearchedUserDetails(res.data["Profile Details"]));
          navigation.navigate("Users");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    collaborationDetail({ collaborationId: pk }).then((res) => {
      setCollabData(res.data);
      setJoiningUsers(res.data.joiningUserProfiles);
      setIsLoading(false);
    });
  }, [pk]);

  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{collabData?.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {!isMyCollab ? (
          <>
            <MuzeButton onPress={handleViewProfile}>View Profile</MuzeButton>
            <MuzeButton onPress={onCollabClick}>Collab</MuzeButton>
          </>
        ) : (
          <Text style={styles.ownerText}>
            You are the owner of this collaboration, you can't join it, but you can view the users
            who joined it!
          </Text>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience Level:</Text>
          <Text style={styles.sectionText}>{collabData?.experienceLevel}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Email:</Text>
          <Text style={styles.sectionText}>
            {collabData.requestingUser && (
              <Pressable
                onPress={() => Linking.openURL(`mailto:${collabData?.requestingUser?.email}`)}
              >
                <Text style={styles.link}>{collabData?.requestingUser?.email}</Text>
              </Pressable>
            )}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location:</Text>
          <Text style={styles.sectionText}>{collabData?.location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application Deadline:</Text>
          <Text style={styles.sectionText}>{collabData?.applicationDeadline}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collab Description:</Text>
          <Text style={styles.collabDescription}>{collabData?.description}</Text>
        </View>
        <View style={styles.sectionFullWidth}>
          <Text style={styles.sectionTitle}>Joined Users:</Text>
          <View style={styles.cardContainer}>
            {joiningUsers.length ? (
              joiningUsers.map((search) => (
                <ArtistCard
                  key={search.user}
                  artist={search}
                  isEmailVisible={true}
                  id={search.user.id}
                />
              ))
            ) : (
              <Text style={styles.noUsersText}>No users yet</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    height: 80,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  ownerText: {
    color: "#f3f3f3",
    textAlign: "center",
  },
  content: {
    marginHorizontal: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionFullWidth: {
    marginVertical: 10,
    width: "100%",
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  sectionText: {
    fontWeight: "300",
    fontSize: 16,
    color: "#fff",
  },
  collabDescription: {
    width: "100%",
    fontSize: 16,
    color: "#fff",
  },
  link: {
    color: "#1e90ff",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 25,
  },
  cardWrapper: {
    minWidth: "30%",
  },
  noUsersText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});

export default ScreenWrapper(CollaborationDetails);
