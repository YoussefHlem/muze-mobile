import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Assets
const starIcon = require("../../assets/Images/star.png");
const heartIcon = require("../../assets/Images/heart.png");

const GigCard = ({ gig }) => {
  const navigation = useNavigation();
  const Photo = require("../../assets/Images/cards/heisenberg.gif");

  return (
    <Pressable
      style={styles.gigCardContainer}
      onPress={() => navigation.navigate("GigDetail", { gigId: gig.id })}
    >
      <View style={styles.gigCardWrapper}>
        <Image source={Photo} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.user}>
            <Image source={Photo} style={styles.userImage} />
            <Text style={styles.username}>{gig.username}</Text>
          </View>
          <Text style={styles.desc}>{gig.desc}</Text>
          <View style={styles.star}>
            <Image source={starIcon} style={styles.starImage} />
            <Text style={styles.starText}>{gig.star}</Text>
          </View>
        </View>
        <View style={styles.detail}>
          <Image source={heartIcon} style={styles.heartImage} />
          <View style={styles.price}>
            <Text style={styles.priceText}>STARTING AT</Text>
            <Text style={styles.priceValue}>
              ${gig.price}
              <Text style={styles.priceSup}>99</Text>
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gigCardContainer: {
    marginBottom: 40,
  },
  gigCardWrapper: {
    width: 250,
    height: 400,
    borderWidth: 1,
    borderColor: "rgb(228, 228, 228)",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    color: "#fff",
  },
  userImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    resizeMode: "cover",
    marginRight: 10,
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
  },
  starImage: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  starText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffc108",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  desc: {
    color: "#fff",
  },
  heartImage: {
    width: 24,
    height: 24,
  },
  price: {
    alignItems: "flex-end",
  },
  priceText: {
    color: "#999",
    fontSize: 12,
  },
  priceValue: {
    color: "#555",
    fontSize: 18,
    fontWeight: "400",
  },
  priceSup: {
    fontSize: 12,
    fontWeight: "300",
  },
});

export default GigCard;
