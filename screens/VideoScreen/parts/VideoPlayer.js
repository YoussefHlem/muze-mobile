// Libs
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/services/userSlice";

// Apis
import { deletePost } from "../../../apis/user";
import { useTranslation } from "react-i18next";

// Assets
const likeBtnImage = "../../../assets/Images/cards/like.png";

const VideoPlayer = () => {
  const navigation = useNavigation();
  const video = useRef(null);
  const { t } = useTranslation();

  const { user } = useSelector(selectUser);
  const { width } = useWindowDimensions();

  const [isLike, setIsLike] = useState(
    likes?.map((ele) => ele.id).indexOf(user.pk) >= 0,
  );
  const [likesCount, setLikesCount] = useState(likes?.length);
  const [userCoverPhoto, setUserCoverPhoto] = useState();
  const [videos, setVideos] = useState([
    {
      _id: "13",
      uri: {
        uri: "https://muzefirststorage.blob.core.windows.net/usercontainer/posts/posts-1695155626922",
      },
    },
  ]);
  const [status, setStatus] = useState({});

  const videoSource = useSelector((state) => state.video.video);
  const { likes, id, author, description, body } = videoSource;
  const vidoeURL = videoSource.videoUrl[0].url;

  useEffect(() => {
    getRandomPosts({
      noWantedPosts: 9,
    }).then((res) => {
      const data = res.data;
      const videoEntries = [];
      data.posts.map((post) =>
        post.videoUrl.map((video) => {
          videoEntries.push({
            _id: video.id,
            uri: video.url,
          });
        }),
      );
      console.log(videoEntries);
      setVideos(videoEntries);
    });
  }, []);

  const handleDeletePress = (id) => {
    deletePost({ postId: id }).then(() => {
      Toast.show({
        type: "success",
        text1: "Video Deleted",
      });
      navigation.navigate("Explore");
    });
  };

  return <View></View>;
};

// Mini Components
const LikeBtn = ({ onPress, likesCount }) => {
  return (
    <Pressable onPress={onPress} style={styles.likeBtnContainer}>
      <Text style={{ color: "#fff", fontSize: 18 }}>{likesCount}</Text>
      <Image source={require(likeBtnImage)} style={styles.likeBtnIcon} />
    </Pressable>
  );
};

const DeletePost = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.deleteBtn}>{t("Delete Post")}</Text>
    </Pressable>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 15,
  },
  titleContainer: {
    borderBlockColor: "#fff",
    borderBottomWidth: 1,
  },
  title: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 22,
  },
  video: {
    alignSelf: "center",
    height: 232,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: -8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 40,
  },
  likeBtnContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnIcon: {
    width: 38,
    height: 30,
    margin: "10px 35px 10px auto",
    resizeMode: "contain",
  },
  deleteBtn: {
    color: "#fc6a6a",
    backgroundColor: "transparent",
    width: "fit-content",
    borderWidth: 1,
    borderColor: "#fc6a6a",
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
