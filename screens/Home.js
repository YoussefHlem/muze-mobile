import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { useNavigation } from "@react-navigation/native";

import { MuzeButton, PostCard, PostModal } from "../components";

// import { setVideoData } from "../../redux/services/video/videoSlice";
import { setVideoData } from "../store/services/videoSlice";
import { popularVideos as getPopularVideos } from "../apis/video";
import ScreenWrapper from "../hoc/ScreenWrapper";

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
      <ScrollView
        contentContainerStyle={styles.posts}
        style={{
          flex: 1,
        }}
      >
        {popularVideos.length ? (
          popularVideos.map((video, index) => (
            <Pressable
              key={index}
              onPress={() => {
                dispatch(setVideoData(video));
                navigation.navigate("Video", { state: video });
              }}
            >
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
    color: "#fff", // You can set the color according to your design
  },
  posts: {
    flexDirection: "row",
    gap: 28,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default ScreenWrapper(Home);
