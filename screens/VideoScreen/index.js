// Libs
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SectionWrapper from "../../hoc/ScreenWrapper";

// Components
import VideoPlayer from "./parts/VideoPlayer";
import CommentSection from "./parts/CommentSection";

const VideoScreen = () => {
  return (
    <ScrollView style={{ marginBottom: 100 }}>
      <VideoPlayer />
      <CommentSection />
    </ScrollView>
  );
};

export default SectionWrapper(VideoScreen);

const styles = StyleSheet.create({});
