import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import PostsTab from "./PostsTab";
import PopularArtistsTab from "./PopularArtistsTab";
import CollabTab from "./CollabTab";
import { useTranslation } from "react-i18next";

const renderScene = SceneMap({
  Posts: PostsTab,
  PopularArtists: PopularArtistsTab,
  Collab: CollabTab,
});

const Tabs = () => {
  const layout = useWindowDimensions();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Posts", title: t("Posts") },
    { key: "PopularArtists", title: t("Artists") },
    { key: "Collab", title: t("Collab") },
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
