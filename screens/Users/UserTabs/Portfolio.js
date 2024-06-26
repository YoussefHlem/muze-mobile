// Libs
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// Apis
import { userPosts } from "../../../apis/users";

// Components
import PostCard from "../../../components/common/PostCard";
import { useDispatch } from "react-redux";
import { setVideoData } from "../../../store/services/videoSlice";

// Assets
const Portfolio = () => {
  const [Posts, setPosts] = useState([]);

  const { user } = useSelector((state) => state.user.searchedUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    userPosts({
      userId: user.id,
    }).then((res) => {
      setPosts(res.data.posts);
    });
  }, []);
  const videoNavigationHandler = (video) => {
    dispatch(setVideoData(video));
    navigation.navigate("Video");
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
        {Posts?.length ? (
          Posts?.map((post, index) => (
            <Pressable onPress={() => videoNavigationHandler(post)} key={index}>
              <PostCard
                key={index}
                cover={post.postCoverUrl}
                isProfile={true}
                date={post.createdOn}
              />
            </Pressable>
          ))
        ) : (
          <Text>{t("No Posts yet")}</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Portfolio;
