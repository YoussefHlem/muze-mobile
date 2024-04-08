import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import MusicianTab from "./MusicianTab";
import GenresTab from "./GenresTab";
import CollabTab from "./CollabTab";

const renderScene = SceneMap({
  Musician: MusicianTab,
  Genres: GenresTab,
  Collabs: CollabTab,
});

const Tabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Musician", title: "Musician" },
    { key: "Genres", title: " Genres" },
    { key: "Collabs", title: "Collabs" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      pagerStyle={{ marginTop: 15, marginBottom: 80 }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          contentContainerStyle={{ backgroundColor: "#313131", height: 50 }}
          inactiveColor="#666"
          activeColor="#fff"
        />
      )}
    />
  );
};

export default Tabs;

const styles = StyleSheet.create({});
