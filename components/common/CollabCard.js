import React from "react";
import { View, Text, Pressable, Image, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MuzeButton from "./MuzeButton";
import { LinearGradient } from "expo-linear-gradient";
import { deleteCollab } from "../../apis/collaboration";
import Toast from "react-native-toast-message";

const locationPin = require("../../assets/Images/collaborations/location-pin.png");
const UserBg = require("../../assets/Images/collaborations/collab-user-circle.png");

const CollabCard = ({ item, firstName, lastName, title, location, profileImage, reFetch }) => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const handleViewDetails = (item) => {
    navigate("CollaborationDetails", { state: item });
  };

  const handleDeleteCollab = (item) => {
    console.log("object");
    deleteCollab({ collaborationId: item.pk }).then((res) => {
      console.log(res);
      Toast.show({ text1: "Deleted Successfully", type: "success" });
      reFetch();
    });
  };

  return (
    <Pressable
      onPress={() => navigate("CollaborationDetails", { state: item })}
      style={[styles.container, { width: width }]}
    >
      <LinearGradient
        colors={["#0d0d0d80", "#0d0d0d80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { width: width - 50 }]}
      >
        <View style={styles.collabContent}>
          <View style={styles.collabUser}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <>
                <Image source={UserBg} style={styles.userBg} resizeMode="cover" />
                <Text style={styles.userInitial}>
                  {firstName ? firstName[0].toUpperCase() : ""}
                </Text>
              </>
            )}
          </View>
          <View style={styles.collabDetails}>
            <Text style={styles.collabDesc}>{title}</Text>
            <Text style={styles.userName}>{lastName ? `${firstName} ${lastName}` : firstName}</Text>
            <View style={styles.locationWrapper}>
              <Image source={locationPin} style={styles.locationPin} />
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>
          <View style={styles.actionButtonsContainer}>
            <MuzeButton style={styles.actionButton} onPress={() => handleViewDetails(item)}>
              View Details
            </MuzeButton>
            {/* <MuzeButton style={styles.actionButton} onPress={() => handleDeleteCollab(item)}>
              Delete
            </MuzeButton> */}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  collabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  collabUser: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "start",
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  userBg: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  userInitial: {
    position: "absolute",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 50,
    color: "#ffffff",
    flexDirection: "row",
    justifyContent: "center",
    right: "6.5%",
    top: "4%",
  },
  collabDetails: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 10,
  },
  userName: {
    fontWeight: "400",
    fontSize: 15,
    textAlign: "right",
    color: "#fff",
  },
  collabDesc: {
    fontWeight: "600",
    fontSize: 23,
    color: "#fff",
    textAlign: "center",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  locationPin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  location: {
    fontWeight: "400",
    fontSize: 15,
    color: "#fff",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  actionButton: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
  },
  gradient: {
    borderRadius: 10,
    padding: 25,
    // alignItems: "center",
  },
});

export default CollabCard;
