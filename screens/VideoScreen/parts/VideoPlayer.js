// Libs
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/services/userSlice";

// Apis
import { likePost, dislikePost, deletePost, getAllDetails } from "../../../apis/user";

// Assets
const likeBtnImage = "../../../assets/Images/cards/like.png";

const VideoPlayer = () => {
  const navigation = useNavigation();
  const video = useRef(null);

  const { user } = useSelector(selectUser);
  const { width } = useWindowDimensions();

  const [isLike, setIsLike] = useState(likes?.map((ele) => ele.id).indexOf(user.pk) >= 0);
  const [likesCount, setLikesCount] = useState(likes?.length);
  const [userCoverPhoto, setUserCoverPhoto] = useState();
  const [status, setStatus] = useState({});

  const videoSource = useSelector((state) => state.video.video);
  const { likes, id, author, description, body } = videoSource;
  const vidoeURL = videoSource.videoUrl[0].url;

  useEffect(() => {
    getAllDetails().then((res) => {
      setUserCoverPhoto(res.data["Profile Details"]?.userCoverImageUrl);
    });
  }, []);

  const handleLikePress = (id, action) => {
    setIsLike(!isLike);
    if (isLike) {
      Toast.show({
        type: "success",
        text1: "DisLiked",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Liked",
      });
    }
    const mutationFunction = action === "like" ? likePost : dislikePost;
    mutationFunction({
      post_id: id,
    }).then((res) => {
      setLikesCount(res.data.post.likes?.length);
    });
  };

  const handleDeletePress = (id) => {
    deletePost({ postId: id }).then(() => {
      Toast.show({
        type: "success",
        text1: "Video Deleted",
      });
      navigation.navigate("Explore");
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{body}</Text>
      </View>
      <ImageBackground
        source={{ uri: userCoverPhoto }}
        style={[styles.container, { height: 213, width: width - 20 }]}
      >
        <Video
          ref={video}
          style={[styles.video, { width: width - 20 }]}
          source={{
            uri: vidoeURL,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </ImageBackground>

      <View style={styles.actions}>
        {author === user.pk ? <DeletePost onPress={() => handleDeletePress(id)} /> : <View></View>}

        <LikeBtn
          onPress={() => handleLikePress(id, isLike ? "dislike" : "like")}
          likesCount={likesCount}
        />
      </View>
      <View>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.title}>{description}</Text>
      </View>
    </View>
  );
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
      <Text style={styles.deleteBtn}>Delete Post</Text>
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
