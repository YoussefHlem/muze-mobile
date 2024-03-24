import React, { useEffect } from "react";
import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedUserDetails, likePost } from "../../apis/user";
import {
  selectUser,
  setSearchedUserDetails,
} from "../../store/services/userSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const PostCard = ({ img, postId, userId, cover, name, isProfile }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClick = () => {
    getSearchedUserDetails({
      profileId: userId,
    }).then((res) => {
      if (userId !== user?.pk) {
        dispatch(setSearchedUserDetails(res.data["Profile Details"]));
        navigation.navigate("UserProfile");
      } else {
        navigation.navigate("Profile");
      }
    });
  };

  const handleLikeClick = () => {
    likePost({
      post_id: postId,
    }).then(() => {
      Toast.show({ type: "success", text1: "Post Liked" });
    });
  };

  return (
    <View
      style={{
        width: 180,
        height: 340,
        borderColor: "#202020",
        backgroundColor: "#202020",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <ImageBackground
        source={{ uri: cover }}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        {!isProfile && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 5,
            }}
          >
            <Pressable onPress={handleClick}>
              <Image
                source={{ uri: img }}
                style={{ width: 40, height: 40, borderRadius: 30 }}
              />
            </Pressable>
            <View>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        )}
        <Pressable
          onPress={handleLikeClick}
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
          }}
        >
          <Image
            source={require(`../../assets/Images/cards/like.png`)}
            style={{ width: 20, height: 19.5 }}
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default PostCard;
