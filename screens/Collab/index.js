// Libs
import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, ScrollView } from "react-native";

// Screens
import ScreenWrapper from "../../hoc/ScreenWrapper";
import GenresTab from "./Tabs/GenresTab";
import MusicianTab from "./Tabs/MusicianTab";
import CollabTab from "./Tabs/CollabTab";
import { MuzeButton } from "../../components";
import { useNavigation } from "@react-navigation/native";

// Assets
const HeaderBackground = require("../../assets/Images/collaborations/collaborations-background.jpg");

const Collab = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ marginBottom: 80 }}>
      <CollabHeader navigation={navigation} />
      <MusicianTab />
      <GenresTab />
      <CollabTab />
    </ScrollView>
  );
};
// Mini Components
const CollabHeader = ({ navigation }) => {
  return (
    <>
      <ImageBackground source={HeaderBackground} style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>
              Find The <Text style={styles.coloredText}>Collab</Text> That{"\n"}
              <Text style={styles.coloredText}>Matches</Text> Your Passion
            </Text>
          </View>
          <View style={[styles.headerSection]}>
            <MuzeButton
              onPress={() => {
                navigation.navigate("CollaborationPost");
              }}
              style={{ marginLeft: -25 }}
            >
              Submit a collab
            </MuzeButton>
          </View>
        </View>
      </ImageBackground>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 24, marginBottom: 30 }}>
        Popular Categories
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    resizeMode: "cover",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerSection: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: "#ffffff",
    maxWidth: 450,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 10,
  },
  coloredText: {
    color: "#f77599",
    fontWeight: "600",
  },
});

export default ScreenWrapper(Collab);
