// Libs
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Image } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import EmojiSelector from "react-native-emoji-selector";

// Apis
import { createComment, getAllPostComments, deleteComment } from "../../../apis/video";
import { getSearchedUserDetails } from "../../../apis/user";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setSearchedUserDetails } from "../../../store/services/userSlice";
import { getAuthToken } from "../../../utils/AuthToken";
import style from "react-native-datepicker/style";

// Assets
const defaultImage = "../../../assets/Images/common/user.jpg";
const CommentBtn = "../../../assets/Images/video-screen/comment-btn.png";

const CommentSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector(selectUser);
  const { pk } = user;

  const videoState = useNavigationState((state) => state.routes[1].params.state);
  const { id } = videoState;

  const [showPicker, setShowPicker] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [comment, setComment] = useState("");
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    (async () => {
      const authToken = await getAuthToken();
      setAuthToken(authToken);
    })();
  }, []);

  const handleCommentSubmit = async () => {
    await createComment({ comment, postId: id }).then(() => {
      if (id) {
        getAllPostComments({
          postId: id,
        }).then((res) => {
          if (res.data) {
            setMyComments(res.data["All Post Comments"]);
          }
        });
      }
    });
    setComment("");
  };

  const handleCommenterClick = (author) => {
    if (authToken) {
      getSearchedUserDetails({
        profileId: author,
      }).then((res) => {
        console.log(res.data["Profile Details"].user, pk);
        if (res.data["Profile Details"].user === pk) {
          navigation.navigate("Profile");
        } else {
          dispatch(setSearchedUserDetails(res.data["Profile Details"]));
          navigation.navigate("Users");
        }
      });
    } else {
      navigation.navigate("Sign In");
    }
  };

  const handleCommentOnChange = (text) => {
    console.log(text);
    setComment(text);
  };

  const handleEmojiClick = (emoji) => {
    setComment((comment) => comment + emoji);
    setShowPicker(false);
  };

  const deleteCommentHandler = (id) => {
    deleteComment({
      commentId: id,
    }).then(() => {
      getAllPostComments({
        postId: id,
      }).then((res) => {
        if (res.data) {
          Toast.show({
            type: "success",
            text1: "Comment Deleted Successfully",
          });
          setMyComments(res.data["All Post Comments"]);
        }
      });
    });
  };

  useEffect(() => {
    getAllPostComments({ postId: id }).then((res) => {
      if (res.data) {
        setMyComments(res.data["All Post Comments"]);
      }
    });
  }, []);
  return (
    <>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comments</Text>
        <ScrollView contentContainerStyle={styles.commentsWrapper}>
          {myComments.length ? (
            myComments.map((commentData) => (
              <View key={commentData.id} style={styles.commentWrapper}>
                <Pressable onPress={() => handleCommenterClick(commentData.author)}>
                  <Image
                    source={
                      commentData.userImageUrl
                        ? { uri: commentData.userImageUrl }
                        : require(defaultImage)
                    }
                    style={styles.commentImage}
                  />
                </Pressable>
                <View style={styles.userInfo}>
                  <View>
                    <Pressable onPress={() => handleCommenterClick(commentData.author)}>
                      <Text
                        style={styles.userName}
                      >{`${commentData?.firstName} ${commentData?.lastName}`}</Text>
                    </Pressable>
                    <Text style={styles.comment}>{commentData.comment}</Text>
                  </View>
                  {user.pk === commentData.author && (
                    <Pressable onPress={() => deleteCommentHandler(commentData.id)}>
                      <Text style={styles.deleteButton}>Delete</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 18, color: " #fff", marginLeft: 15 }}>No Comment Yet</Text>
          )}
        </ScrollView>

        <View style={styles.postComment}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write Comment Here..."
            placeholderTextColor={"#fff"}
            value={comment}
            onChangeText={handleCommentOnChange}
          />
          <Pressable style={styles.emojiButton} onPress={() => setShowPicker(!showPicker)}>
            <Text style={{ fontSize: 20 }}>😀</Text>
          </Pressable>
          <Pressable onPress={handleCommentSubmit}>
            <Image style={styles.commentButton} source={require(CommentBtn)} alt="Button" />
          </Pressable>
        </View>
      </View>
      {showPicker && (
        <EmojiSelector
          showSearchBar={false}
          key={Math.random().toString(32)}
          theme="#007AFF"
          onEmojiSelected={(emoji) => handleEmojiClick(emoji)}
        />
      )}
    </>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  commentsSection: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  commentsHeader: {
    padding: 15,
    borderBottomWidth: 1,
    marginBottom: 25,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: "#fff",
  },
  commentsWrapper: {
    maxHeight: "100%",
  },
  commentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  commentImage: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 2,
    marginLeft: 10, // Adjust as needed
  },
  userName: {
    fontWeight: "400",
    fontSize: 13,
    color: "white",
    paddingBottom: 6,
  },
  comment: {
    fontWeight: "400",
    fontSize: 18,
    color: "white",
    width: "fit-content",
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
    color: "#fc6a6a",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fc6a6a",
    transition: "all 0.3s",
    marginTop: -18,
  },
  postComment: {
    flexDirection: "row",
    marginTop: 25,
    backgroundColor: "#161616",
    borderRadius: 8,
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    color: "white",
    padding: 10,
    fontSize: 20,
  },
  emojiButton: {
    padding: 10,
  },
  commentButton: {
    padding: 10,
  },
});
