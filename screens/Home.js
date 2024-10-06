import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Loading, PostCard } from "../components";
import ScreenWrapper from "../hoc/ScreenWrapper";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch } from "react-redux";
import { setVideoData } from "../store/services/videoSlice";
import { popularVideos as getPopularVideos } from "../apis/video";
import { getRandomPosts } from "../apis/post";
import PopularArtistsTab from "./Explore/Tabs/PopularArtistsTab"; // Import your artists component

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [popularVideos, setPopularVideos] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Trending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading before fetching data

    if (selectedValue === "Trending") {
      getRandomPosts({
        noWantedPosts: 9,
      }).then((res) => {
        setPopularVideos(res.data.posts);
        setLoading(false); // Stop loading after data fetch
      });
    } else if (selectedValue === "Following") {
      getPopularVideos().then((res) => {
        setPopularVideos(res.data.posts);
        setLoading(false); // Stop loading after data fetch
      });
    }
    setLoading(false); // Stop loading after data fetch
  }, [selectedValue]);

  const videoNavigationHandler = (video) => {
    dispatch(setVideoData(video));
    navigation.navigate("Video", { state: video });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SwitchSelector
          initial={0}
          onPress={(value) => setSelectedValue(value)}
          textColor="#FFFFFF"
          selectedColor="#FFFFFF"
          buttonColor="#1D7EEC"
          borderColor="#202020"
          backgroundColor="#202020"
          height={50}
          fontSize={17}
          bold
          hasPadding
          valuePadding={3}
          borderRadius={25}
          options={[
            { label: "Trending", value: "Trending" },
            { label: "Following", value: "Following" },
            { label: "Artists", value: "Artists" }, // Added the Artists option
          ]}
        />
      </View>

      {loading ? (
        <Loading /> // Show loading indicator
      ) : selectedValue === "Artists" ? ( // Conditionally render PopularArtistsTab for "Artists"
        <PopularArtistsTab />
      ) : (
        <ScrollView contentContainerStyle={styles.posts}>
          {popularVideos.length ? (
            popularVideos.map((video, index) => (
              <Pressable
                key={index}
                onPress={() => videoNavigationHandler(video)}
              >
                <PostCard
                  postId={video.id}
                  userId={video.authorDetail.user}
                  img={video.authorDetail.userImageUrl}
                  cover={video.postCoverUrl}
                  name={`${video.authorDetail.firstName} ${video.authorDetail.lastName}`}
                  date={video.createdOn}
                />
              </Pressable>
            ))
          ) : (
            <Text>{t("No popular videos at the moment!")}</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: "5%",
    marginHorizontal: "5%",
  },
  posts: {
    flexDirection: "row",
    gap: 28,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default ScreenWrapper(Home);
