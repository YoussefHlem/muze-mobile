// Libs
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

// Components
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { MuzeButton, PostCard, PostModal } from "../components";
import ScreenWrapper from "../hoc/ScreenWrapper";

// Redux
import { useDispatch } from "react-redux";
import { setVideoData } from "../store/services/videoSlice";
import { popularVideos as getPopularVideos } from "../apis/video";

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [popularVideos, setPopularVideos] = useState([]);

  useEffect(() => {
    if (!showModal) {
      getPopularVideos().then((res) => setPopularVideos(res.data.posts));
    }
  }, [showModal]);

  const videoNavigationHandler = () => {
    dispatch(setVideoData(video));
    navigation.navigate("Video", { state: video });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("homePage")}</Text>
        <MuzeButton onPress={() => setShowModal(true)}>
          Create a new post
        </MuzeButton>
        <PostModal
          show={showModal}
          onHide={() => setShowModal(false)}
          setShowModal={setShowModal}
        />
      </View>
      <ScrollView contentContainerStyle={styles.posts}>
        {popularVideos.length ? (
          popularVideos.map((video, index) => (
            <Pressable key={index} onPress={videoNavigationHandler}>
              <PostCard
                postId={video.id}
                userId={video.authorDetail.user}
                img={video.authorDetail.userImageUrl || PostImg}
                cover={video.postCoverUrl || PostImg}
                name={video.authorDetail.firstName}
              />
            </Pressable>
          ))
        ) : (
          <Text>No popular videos at the moment!</Text>
        )}
      </ScrollView>
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
    marginVertical: "2%",
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    color: "#fff",
  },
  posts: {
    flexDirection: "row",
    gap: 28,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default ScreenWrapper(Home);
