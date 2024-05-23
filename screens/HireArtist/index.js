// Libraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ScreenWrapper from "../../hoc/ScreenWrapper";

// Components
import MuzeButton from "../../components/common/MuzeButton";
import HireArtistModal from "../../components/HireArtist/HireArtistModal";
import GigCard from "../../components/HireArtist/GigCard";

// Apis
import { allGigs } from "../../apis/gigs";

// Assets
const gigs = [
  {
    id: 1,
    img: "../../assets/Images/cards/heisenberg.gif",
    pp: "../../assets/Images/cards/heisenberg.gif",
    username: "Heisenberg",
    desc: "Number 1 In Creating Blue Crystal Meth in the south valley bitch!",
    star: 4.5,
    price: 10.99,
  },
  {
    id: 2,
    img: "../../assets/Images/cards/tuco.gif",
    pp: "../../assets/Images/cards/tuco.gif",
    username: "Tuco Salamanca",
    desc: "Number 1 In Selling Blue Crystal Meth in the south valley bitch!",
    star: 3.8,
    price: 15.99,
  },
];

const HireArtist = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    allGigs().then(() => {
      // Set Gigs
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hire Artist Page</Text>
        <MuzeButton
          onPress={() => {
            setShowModal(true);
          }}
        >
          Post Your Gig
        </MuzeButton>
      </View>
      <HireArtistModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        setShowModal={setShowModal}
      />
      <View style={styles.posts}>
        {gigs.length ? (
          <FlatList
            data={gigs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <GigCard gig={item} />}
            numColumns={2}
            columnWrapperStyle={styles.column}
          />
        ) : (
          <Text style={styles.noGigsText}>No Gigs Have Posted Yet</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    justifyContent: "center",
    gap: 30,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 28,
    color: "#fff", // Replace with your theme color if needed
    marginRight: 20,
  },
  posts: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  column: {
    justifyContent: "space-between",
  },
  noGigsText: {
    color: "#fff", // Replace with your theme color if needed
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ScreenWrapper(HireArtist);
