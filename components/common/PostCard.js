// Libs
import { useNavigation } from "@react-navigation/native";

// Components
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setSearchedUserDetails,
} from "../../store/services/userSlice";

// Apis
import { getSearchedUserDetails, likePost } from "../../apis/user";

// assets
const likeIcon = require(`../../assets/Images/cards/like.png`);

const PostCard = ({ img, postId, userId, cover, name, isProfile }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector(selectUser);

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
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: cover }}
        style={styles.containerBackground}
      >
        {!isProfile && (
          <View style={styles.profile}>
            <Pressable onPress={handleClick}>
              <Image source={{ uri: img }} style={styles.profileIcon} />
            </Pressable>
            <View>
              <Text style={styles.profileText}>{name}</Text>
            </View>
          </View>
        )}
        <Pressable onPress={handleLikeClick} style={styles.likeContainer}>
          <Image source={likeIcon} style={styles.likeIcon} />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 340,
    borderColor: "#202020",
    backgroundColor: "#202020",
    padding: 10,
    borderRadius: 10,
  },
  containerBackground: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  profileText: {
    marginTop: 5,
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  likeContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  likeIcon: {
    width: 20,
    height: 19.5,
  },
});

export default PostCard;
