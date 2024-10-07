// Libs
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import ReelCard from "../../components/Reels/ReelCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/services/userSlice";
import { dislikePost, likePost } from "../../apis/user";
import CommentSection from "./parts/CommentSection";

const VideoScreen = () => {
  const { user } = useSelector(selectUser);
  const videoSource = useSelector((state) => state.video.video);

  const vidoeURL = videoSource.videoUrl[0].url;
  const { likes, id, author, description, body } = videoSource;

  const [isLike, setIsLike] = useState();
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(likes?.map((ele) => ele.id).indexOf(user.pk) >= 0);
    console.log(user.pk);
    setIsLike(likes?.map((ele) => ele.id).indexOf(user.pk) >= 0);
  }, []);

  const LikeVideo = (id) => {
    likePost({
      post_id: id,
    }).then((res) => {
      setIsLike(true);
    });
  };
  const DisLikeVideo = (id) => {
    dislikePost({
      post_id: id,
    }).then((res) => {
      setIsLike(false);
    });
  };

  return (
    <SafeAreaView>
      <ReelCard
        _id={id}
        uri={{ uri: vidoeURL }}
        ViewableItem={""}
        coverPhoto={{ uri: videoSource.postCoverUrl }}
        liked={isLike}
        onLikePress={LikeVideo}
        onDislikePress={DisLikeVideo}
        onCommentPress={() => setIsVisible(true)}
      />
      <CommentSection
        videoId={id}
        visible={visible}
        setIsVisible={() => setIsVisible(!visible)}
      />
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
