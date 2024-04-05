import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import Portfolio from "./Portfolio";
import Genres from "./Genres";
import Collaborations from "./Collaborations";
import Followers from "./Followers";
import Following from "./Following";
import Booking from "./Bookings";
import Studios from "./Studios";

const ProfileTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
  };

  const Screens = [
    { name: "Portfolio", component: <Portfolio /> },
    { name: "Genres", component: <Genres /> },
    { name: "Collaborations", component: <Collaborations /> },
    { name: "Followers", component: <Followers /> },
    { name: "Following", component: <Following /> },
    // { name: "Bookings", component: <Booking /> },
    { name: "Studios", component: <Studios /> },
  ];

  return (
    <>
      <ScrollView horizontal style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: "#fff" }}>
        {Screens.map((screen, idx) => (
          <Pressable
            key={idx}
            onPress={() => handleIndexChange(idx)}
            style={[
              styles.tab,
              index === idx && styles.activeTab,
              idx === Screens.length - 1 && { marginRight: 0 }, // Remove right margin for the last tab
            ]}
          >
            <Text style={styles.tabText}>{screen.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ marginVertical: 50 }}>
        <ScrollView style={{ flex: 1, marginBottom: 80 }}>{Screens[index].component}</ScrollView>
      </View>
    </>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tabText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#f77599",
  },
});
