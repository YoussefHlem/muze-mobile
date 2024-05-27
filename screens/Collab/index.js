// Libs
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

// Screens
import ScreenWrapper from "../../hoc/ScreenWrapper";
import GenresTab from "./components/GenresTab";
import MusicianTab from "./components/MusicianTab";
import CollabTab from "./components/CollabTab";
import { MuzeButton } from "../../components";

// Components
import PostCollabModal from "./components/PostCollabModal";

// Assets
const HeaderBackground = require("../../assets/Images/collaborations/collaborations-background.jpg");

const Collab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={{ marginBottom: 80 }}>
      <PostCollabModal isVisible={isModalVisible} onClose={handleCloseModal} />
      <CollabHeader onOpenModal={handleOpenModal} />
      <MusicianTab />
      <GenresTab />
      <CollabTab />
    </ScrollView>
  );
};

// Mini Components
const CollabHeader = ({ onOpenModal }) => {
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
            <MuzeButton onPress={onOpenModal} style={{ marginLeft: -25 }}>
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
