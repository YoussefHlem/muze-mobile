// Libs
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

// Apis
import { getRandomPosts } from "../../../apis/post";
import { useDispatch } from "react-redux";

// Redux
import { setVideoData } from "../../../store/services/videoSlice";
import { useNavigation } from "@react-navigation/core";

// Components
import { PostCard } from "../../../components";
import { useTranslation } from "react-i18next";

const PostsTab = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const [randomPosts, setRandomPosts] = useState([]);

  const videoNavigationHandler = (video) => {
    dispatch(setVideoData(video));
    navigate("Video", { state: video });
  };

  useEffect(() => {
    getRandomPosts({
      noWantedPosts: 9,
    }).then((res) => {
      setRandomPosts(res.data.posts);
    });
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.posts}>
        {randomPosts?.length ? (
          randomPosts.map((video, index) => (
            <Pressable key={index} onPress={() => videoNavigationHandler(video)}>
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
    </View>
  );
};

export default PostsTab;

const styles = StyleSheet.create({
  posts: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
