// Libs
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ReactTimeAgo from "react-time-ago";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setSearchedUserDetails,
} from "../../store/services/userSlice";

// Apis
import { getSearchedUserDetails, likePost } from "../../apis/user";

// Assets
const PostImg = require("../../assets/Images/common/post-card-img.jpg");

// Helper components
const Time = ({ children }) => <Text style={styles.timeStamp}>{children}</Text>;
const TimeAgo = (props) => <ReactTimeAgo {...props} component={Time} />;

const PostCard = ({
  img,
  postId,
  userId,
  cover,
  name,
  isProfile,
  date,
  isMinified,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(selectUser);
  const { width, height } = useWindowDimensions();

  const cardStyles = isMinified
    ? { width: width / 2 - 20, height: height / 2 - 120 }
    : { width: width - 50, height: height - 320 };

  const navigateToProfile = (profileId) => {
    getSearchedUserDetails({ profileId }).then((res) => {
      if (profileId !== user?.pk) {
        dispatch(setSearchedUserDetails(res.data["Profile Details"]));
        navigation.navigate("Users");
      } else {
        navigation.navigate("Profile");
      }
    });
  };

  const handleLikeClick = () => {
    likePost({ post_id: postId }).then(() => {
      Toast.show({ type: "success", text1: "Post Liked" });
    });
  };

  return (
    <View style={[styles.container, cardStyles]}>
      {!isProfile && (
        <View style={styles.profile}>
          <Pressable onPress={() => navigateToProfile(userId)}>
            <Image
              source={img ? { uri: img } : PostImg}
              style={styles.profileIcon}
            />
          </Pressable>
          <View style={styles.infoContainer}>
            <Text style={styles.profileText}>{name}</Text>
            <TimeAgo date={date} locale="en-US" />
          </View>
        </View>
      )}
      <ImageBackground
        source={cover ? { uri: cover } : PostImg}
        style={styles.containerBackground}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#202020",
    backgroundColor: "#202020",
    padding: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
  containerBackground: {
    width: "100%",
    height: 400,
    overflow: "hidden",
    borderRadius: 30,
    position: "relative",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
    marginBottom: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1.5,
  },
  profileText: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  likeContainer: {
    position: "absolute",
    bottom: 20,
    right: 12,
  },
  likeIcon: {
    width: 20,
    height: 19.5,
  },
  infoContainer: {
    marginLeft: 10,
  },
  timeStamp: {
    fontSize: 12,
    marginLeft: 5,
    marginTop: 3,

    color: "#FFFFFFA1",
    textTransform: "capitalize",
  },
});

export default PostCard;
