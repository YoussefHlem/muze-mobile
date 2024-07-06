import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  useWindowDimensions,
} from "react-native";
import ScreenWrapper from "../../hoc/ScreenWrapper";

// Apis
import { gigDetails } from "../../apis/gigs";
import { MuzeButton } from "../../components";

// Mock data
const reviews = [
  {
    name: "Garner David",
    country: "United States",
    stars: 5,
    comment:
      "I just want to say that art_with_ai was the first, and after this, the only artist Ill be using on Fiverr. Communication was amazing, each and every day he sent me images that I was free to request changes to. They listened, understood, and delivered above and beyond my expectations. I absolutely recommend this gig, and know already that Ill be using it again very very soon.",
    image:
      "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Sidney Owen",
    country: "Germany",
    stars: 5,
    comment:
      "The designer took my photo for my book cover to the next level! Professionalism and ease of working with designer along with punctuality is above industry standards!! Whatever your project is, you need this designer!",
    image:
      "https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Lyle Giles",
    country: "United States",
    stars: 5,
    comment:
      "Amazing work! Communication was amazing, each and every day he sent me images that I was free to request changes to. They listened, understood, and delivered above and beyond my expectations. I absolutely recommend this gig, and know already that Ill be using it again very very soon.",
    image:
      "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const userInfo = {
  name: "Anna Bell",
  stars: 5,
  image:
    "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600",
  country: "USA",
  memberSince: "Aug 2022",
  avgResponseTime: "4 hours",
  lastDelivery: "1 day",
  languages: "English",
  about:
    "My name is Anna, I enjoy creating AI generated art in my spare time. I have a lot of experience using the AI program and that means I know what to prompt the AI with to get a great and incredibly detailed result.",
};

const gigInfo = {
  price: "$ 59.99",
  description:
    "I will create a unique high quality AI generated image based on a description that you give me",
  details: [
    { icon: "../../assets/Images/clock.png", text: "2 Days Delivery" },
    { icon: "../../assets/Images/recycle.png", text: "3 Revisions" },
  ],
  features: [
    { icon: "../../assets/Images/greencheck.png", text: "Prompt writing" },
    { icon: "../../assets/Images/greencheck.png", text: "Artwork delivery" },
    { icon: "../../assets/Images/greencheck.png", text: "Image upscaling" },
    { icon: "../../assets/Images/greencheck.png", text: "Additional design" },
  ],
};

function GigDetails() {
  const { width } = useWindowDimensions();
  useEffect(() => {
    gigDetails().then(() => {
      // Set Gig Details
    });
  }, []);

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem} key={index}>
        <Image
          style={styles.carouselImage}
          source={{
            uri: `https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600`,
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.leftContainer}>
        {/* Gig title */}
        <Text style={styles.gigTitle}>I will create AI generated art for you</Text>
        {/* User information */}
        <View style={styles.userInfo}>
          <Image style={styles.profileImage} source={{ uri: userInfo.image }} />
          <Text style={styles.profileName}>{userInfo.name}</Text>
          <View style={styles.stars}>
            {[...Array(userInfo.stars)].map((_, index) => (
              <Image
                key={index}
                style={styles.starImage}
                source={require("../../assets/Images/star.png")}
              />
            ))}
            <Text style={{ color: "#ffc108" }}>{userInfo.stars}</Text>
          </View>
        </View>
        {/* Carousel */}

        {/* Gig description */}
        <Text style={styles.sectionTitle}>About This Gig</Text>
        <Text style={styles.description}>
          I use an AI program to create images based on text prompts. This means I can help you to
          create a vision you have through a textual description of your scene without requiring any
          reference images...
        </Text>
        {/* Seller information */}
        <View style={styles.seller}>
          <Text style={styles.sectionTitle}>About The Seller</Text>
          <View style={styles.userInfo}>
            <Image style={styles.profileImage} source={{ uri: userInfo.image }} />
            <View style={styles.sellerInfo}>
              <Text style={{ color: "#fff" }}>{userInfo.name}</Text>
              <View style={styles.stars}>
                {[...Array(userInfo.stars)].map((_, index) => (
                  <Image
                    key={index}
                    style={styles.starImage}
                    source={require("../../assets/Images/star.png")}
                  />
                ))}
                <Text style={{ color: "#ffc108" }}>{userInfo.stars}</Text>
              </View>
              <MuzeButton onPress={() => {}} style={{ marginLeft: -30 }}>
                Contact Me
              </MuzeButton>
            </View>
          </View>
          {/* User details */}
          <View style={styles.sellerBox}>
            <View style={styles.sellerDetails}>
              <View style={styles.sellerDetail}>
                <Text style={styles.detailTitle}>From</Text>
                <Text style={styles.detailDescription}>{userInfo.country}</Text>
              </View>
              <View style={styles.sellerDetail}>
                <Text style={styles.detailTitle}>Member since</Text>
                <Text style={styles.detailDescription}>{userInfo.memberSince}</Text>
              </View>
              <View style={styles.sellerDetail}>
                <Text style={styles.detailTitle}>Avg. response time</Text>
                <Text style={styles.detailDescription}>{userInfo.avgResponseTime}</Text>
              </View>
              <View style={styles.sellerDetail}>
                <Text style={styles.detailTitle}>Last delivery</Text>
                <Text style={styles.detailDescription}>{userInfo.lastDelivery}</Text>
              </View>
              <View style={styles.sellerDetail}>
                <Text style={styles.detailTitle}>Languages</Text>
                <Text style={styles.detailDescription}>{userInfo.languages}</Text>
              </View>
            </View>
            <View style={styles.sellerDivider} />
            <Text style={{ color: "#fff" }}>{userInfo.about}</Text>
          </View>
        </View>
        {/* Reviews */}
        <View style={styles.reviews}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.userInfo}>
                <Image style={styles.profileImage} source={{ uri: review.image }} />
                <View style={styles.sellerInfo}>
                  <Text style={{ color: "#fff" }}>{review.name}</Text>
                  <View style={styles.country}>
                    <Image
                      style={styles.countryFlag}
                      source={{
                        uri: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                      }}
                    />
                    <Text style={{ color: "#fff" }}>{review.country}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.stars}>
                {[...Array(review.stars)].map((_, index) => (
                  <Image
                    key={index}
                    style={styles.starImage}
                    source={require("../../assets/Images/star.png")}
                  />
                ))}
                <Text style={{ color: "#ffc108" }}>{review.stars}</Text>
              </View>
              <Text style={{ color: "#fff" }}>{review.comment}</Text>
              <View style={styles.helpful}>
                <Text style={{ color: "#fff" }}>Helpful?</Text>
                <Image
                  style={styles.helpfulIcon}
                  source={require("../../assets/Images/like.png")}
                />
                <Text style={{ color: "#fff" }}>Yes</Text>
                <Image
                  style={styles.helpfulIcon}
                  source={require("../../assets/Images/dislike.png")}
                />
                <Text style={{ color: "#fff" }}>No</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* Right Section */}
      <View style={styles.rightContainer}>
        {/* Gig Price */}
        <View style={styles.price}>
          <Text style={styles.gigPriceTitle}>1 AI generated image</Text>
          <Text style={styles.gigPrice}>{gigInfo.price}</Text>
        </View>
        <Text style={styles.description}>{gigInfo.description}</Text>
        {/* Gig Details */}
        <View style={styles.details}>
          {gigInfo.details.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <Image style={styles.detailIcon} source={{ uri: detail.icon }} />
              <Text style={{ color: "#fff" }}>{detail.text}</Text>
            </View>
          ))}
        </View>
        {/* Gig Features */}
        <View style={styles.features}>
          {gigInfo.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Image style={styles.featureIcon} source={{ uri: feature.icon }} />
              <Text style={{ color: "#fff" }}>{feature.text}</Text>
            </View>
          ))}
        </View>
        <MuzeButton onPress={() => {}} gradientStyle={{ width: "100%" }}>
          Continue
        </MuzeButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 100,
  },
  leftContainer: {
    flex: 2,
    marginBottom: 20,
  },
  rightContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    borderRadius: 5,
    justifyContent: "space-between",
    marginBottom: 40,
  },
  gigTitle: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  profileName: {
    color: "#fff",
    marginRight: 10,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  starImage: {
    width: 14,
    height: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#888",
    marginBottom: 10,
  },
  seller: {
    marginTop: 20,
  },
  sellerInfo: {
    marginLeft: 10,
  },
  sellerBox: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  sellerDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sellerDetail: {
    width: "48%",
    marginBottom: 10,
  },
  detailTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  detailDescription: {
    color: "#888",
  },
  sellerDivider: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    marginVertical: 10,
  },
  reviews: {
    marginTop: 20,
  },
  reviewItem: {
    marginBottom: 20,
  },
  country: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryFlag: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  helpful: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  helpfulIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 10,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gigPriceTitle: {
    fontSize: 18,
    color: "#fff",
  },
  gigPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  features: {
    marginVertical: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  featureIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: 300,
    height: 300,
  },
  slider: {
    marginTop: 15,
    overflow: "visible", // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});

export default ScreenWrapper(GigDetails);
