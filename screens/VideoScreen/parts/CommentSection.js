import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import EmojiSelector from "react-native-emoji-selector";
import {
  createComment,
  deleteComment,
  getAllPostComments,
} from "../../../apis/video";
import { getSearchedUserDetails } from "../../../apis/user";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setSearchedUserDetails,
} from "../../../store/services/userSlice";
import { getAuthToken } from "../../../utils/AuthToken";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";

const defaultImage = "../../../assets/Images/common/user.jpg";
const CommentBtn = "../../../assets/Images/video-screen/comment-btn.png";

const ModalCommentSection = ({ visible, setIsVisible, videoId }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const { user } = useSelector(selectUser);
  const { pk } = user;

  const [showPicker, setShowPicker] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const [comment, setComment] = useState("");
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await getAuthToken();
      setAuthToken(token);
    })();
  }, []);

  useEffect(() => {
    if (visible && videoId) {
      getAllPostComments({ postId: videoId }).then((res) => {
        if (res.data) {
          setMyComments(res.data["All Post Comments"]);
        }
      });
    }
  }, [visible, videoId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    await createComment({ comment, postId: videoId }).then(() => {
      if (videoId) {
        getAllPostComments({
          postId: videoId,
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
        setIsVisible(false);
        if (res.data["Profile Details"].user === pk) {
          navigate("Profile");
        } else {
          dispatch(setSearchedUserDetails(res.data["Profile Details"]));
          navigate("Users");
        }
      });
    } else {
      setIsVisible(false);
      navigate("Sign In");
    }
  };

  const handleEmojiClick = (emoji) => {
    setComment((comment) => comment + emoji);
    setShowPicker(false);
  };

  const deleteCommentHandler = (commentId) => {
    deleteComment({
      commentId: commentId,
    }).then(() => {
      getAllPostComments({
        postId: videoId,
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => setIsVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("Comments")}</Text>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.commentsWrapper}>
          {myComments.length ? (
            myComments.map((commentData) => (
              <View key={commentData.id} style={styles.commentWrapper}>
                <Pressable
                  onPress={() => handleCommenterClick(commentData.author)}
                >
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
                  <View style={styles.commentContent}>
                    <Pressable
                      onPress={() => handleCommenterClick(commentData.author)}
                    >
                      <Text style={styles.userName}>
                        {`${commentData?.firstName} ${commentData?.lastName}`}
                      </Text>
                    </Pressable>
                    <Text style={styles.comment}>{commentData.comment}</Text>
                  </View>
                  {user.pk === commentData.author && (
                    <Pressable
                      onPress={() => deleteCommentHandler(commentData.id)}
                      style={styles.deleteButton}
                    >
                      <Feather name={"trash-2"} size={24} color={"#fc6a6a"} />
                    </Pressable>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>{t("No Comment Yet")}</Text>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.postComment}>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              placeholderTextColor={"#999"}
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <Pressable
              style={styles.emojiButton}
              onPress={() => setShowPicker(!showPicker)}
            >
              <Text style={styles.emojiButtonText}>😀</Text>
            </Pressable>
            <Pressable onPress={handleCommentSubmit} style={styles.sendButton}>
              <Image
                style={styles.commentButton}
                source={require(CommentBtn)}
              />
            </Pressable>
          </View>
        </View>

        {showPicker && (
          <View style={styles.emojiSelector}>
            <EmojiSelector
              showSearchBar={false}
              columns={8}
              theme="#007AFF"
              onEmojiSelected={handleEmojiClick}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    padding: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  commentsWrapper: {
    flex: 1,
  },
  commentWrapper: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  commentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 4,
  },
  comment: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fc6a6a",
  },
  deleteButtonText: {
    color: "#fc6a6a",
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  postComment: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    maxHeight: 100,
  },
  emojiButton: {
    paddingHorizontal: 8,
  },
  emojiButtonText: {
    fontSize: 24,
  },
  sendButton: {
    padding: 8,
  },
  noComments: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 24,
  },
  emojiSelector: {
    height: 250,
  },
});

export default ModalCommentSection;
