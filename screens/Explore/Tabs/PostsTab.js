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

const PostsTab = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [randomPosts, setRandomPosts] = useState([]);

  const videoNavigationHandler = () => {
    dispatch(setVideoData(video));
    navigation.navigate("Video", { state: video });
  };

  useEffect(() => {
    getRandomPosts({
      noWantedPosts: 10,
    }).then((res) => {
      setRandomPosts(res.data.posts);
    });
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.posts}>
        {randomPosts.length ? (
          randomPosts.map((video, index) => (
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

export default PostsTab;

const styles = StyleSheet.create({
  posts: {
    flexDirection: "row",
    gap: 28,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
