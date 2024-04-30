import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Pressable, View, Text, Image, StyleSheet } from "react-native";

import { getMyStudios } from "../../../apis/user";
import { setMyRoomDetails } from "../../../store/services/userSlice";

const MyStudios = () => {
  const myStudios = useSelector((state) => state.user.userStudios);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClick = (id) => {
    getMyStudios({ StudioRoomId: id }).then((res) => {
      dispatch(setMyRoomDetails(res.data));
      navigation.navigate("MyStudio");
    });
  };

  return (
    <View style={styles.container}>
      {myStudios.length ? (
        <ScrollView contentContainerStyle={styles.studiosContainer}>
          {myStudios.map((studio) => (
            <Pressable
              key={studio.id}
              style={styles.studioCard}
              onPress={() => handleClick(studio.id)}
            >
              <Image
                style={styles.studioImage}
                source={require("../../../assets/Images/studio.png")}
              />
              <View style={styles.studioProfile}>
                <View style={styles.studioProfileSection}>
                  <Text style={styles.studioName}>{studio.name}</Text>
                </View>
                <View style={styles.studioProfileSectionSeparator} />
                <View style={styles.facilitiesSection}>
                  <Text>Wifi</Text>
                </View>
                <View style={styles.studioProfileSectionSeparator} />
                <View style={styles.studioProfileSection}>
                  <Text style={styles.ratingSection}>5.0 (318 reviews)</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text>No studios yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  studiosContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  studioCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 0.7,
    width: "90%",
    padding: 10,
  },
  studioImage: {
    width: "30%",
    height: 100,
    marginRight: 10,
  },
  studioProfile: {
    flexDirection: "column",
    width: "60%",
    paddingHorizontal: 10,
  },
  studioProfileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  studioName: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
  },
  studioProfileSectionSeparator: {
    width: "20%",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginBottom: 10,
  },
  facilitiesSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "#6b7280",
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
});

export default MyStudios;
