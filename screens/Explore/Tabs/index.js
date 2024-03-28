import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import PostsTab from "./PostsTab";
import PopularArtistsTab from "./PopularArtistsTab";
import CollabTab from "./CollabTab";

const renderScene = SceneMap({
  Posts: PostsTab,
  PopularArtists: PopularArtistsTab,
  Collab: CollabTab,
});

const Tabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Posts", title: "Posts" },
    { key: "PopularArtists", title: "Artists" },
    { key: "Collab", title: "Collab" },
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
