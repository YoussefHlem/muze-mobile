import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import { getAllDetails, getGenres } from "../../apis/user";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserDetails, setUserStudios } from "../../store/services/userSlice";
import { MuzeButton, PostModal } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

// Assets
const CoverImagePlaceholder = "../../assets/Images/profile-background-cover.png";
const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";

const InstagramIcon = `../../assets/Images/profile/instagram.png`;
const SoundcloudIcon = "../../assets/Images/profile/soundcloud.png";
const YoutubeIcon = "../../assets/Images/profile/youtube.png";
const SpotifyIcon = "../../assets/Images/profile/spotify.png";

const ProfileCover = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const [myUserDetails, setMyUserDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const { user } = useSelector(selectUser);

  const socialMediaLinks = [
    { link: myUserDetails.spotifyLink, icon: SpotifyIcon },
    { link: myUserDetails.soundcloudLink, icon: SoundcloudIcon },
    { link: myUserDetails.youtubeLink, icon: YoutubeIcon },
    { link: myUserDetails.instagramLink, icon: InstagramIcon },
  ];

  useEffect(() => {
    getAllDetails().then((res) => {
      setMyUserDetails(res.data["Profile Details"]);
      dispatch(setUserDetails(res.data["Profile Details"]));
      dispatch(setUserStudios(res.data["Owned Studio Rooms"]));
    });
    getGenres().then((res) => dispatch(setGenres(res.data)));
  }, []);
  return (
    <View>
      <ImageBackground
        source={
          myUserDetails?.userCoverImageUrl
            ? { uri: myUserDetails?.userCoverImageUrl }
            : require(CoverImagePlaceholder)
        }
        style={{ width: width, height: height / 3 }}
      >
        <View style={styles.container}>
          <LinearGradient
            colors={["#016299", "#f77599"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.profileInfoCard}
          >
            <View style={styles.userDescription}>
              <View>
                <Text style={styles.text}>
                  I am {myUserDetails ? myUserDetails.firstName : user.firstName}.
                </Text>
                <Text style={styles.paragraph}>
                  {myUserDetails !== undefined && myUserDetails.bio
                    ? myUserDetails.bio
                    : "No bio yet"}
                </Text>
              </View>
              <View style={styles.socialMediaSection}>
                {myUserDetails?.spotifyLink && (
                  <Pressable onPress={() => window.open(myUserDetails.spotifyLink)}>
                    <Image source={require(SpotifyIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {myUserDetails?.soundcloudLink && (
                  <Pressable onPress={() => window.open(myUserDetails.soundcloudLink)}>
                    <Image source={require(SoundcloudIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {myUserDetails?.youtubeLink && (
                  <Pressable onPress={() => window.open(myUserDetails.youtubeLink)}>
                    <Image source={require(YoutubeIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {myUserDetails?.instagramLink && (
                  <Pressable onPress={() => window.open(myUserDetails.instagramLink)}>
                    <Image source={require(InstagramIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
              </View>
            </View>
          </LinearGradient>
          <View style={styles.buttonContainer}>
            <MuzeButton onPress={() => setShowModal(true)}>Create New post</MuzeButton>
          </View>
          <PostModal show={showModal} onHide={() => setShowModal(false)} />
        </View>
      </ImageBackground>
      <View
        style={{ marginTop: 20, marginBottom: 20, justifyContent: "center", alignItems: "center" }}
      >
        <LinearGradient
          colors={["#016299", "#f77599"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ padding: 1, borderRadius: 10 }}
        >
          <Image
            source={
              myUserDetails?.userImageUrl
                ? { uri: myUserDetails?.userImageUrl }
                : require(ProfileImagePlaceholder)
            }
            style={{
              width: width / 3.5,
              height: height / 3.5,
              borderRadius: 10,
            }}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default ProfileCover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoCard: {
    width: "90%",
    padding: 20,
    backgroundColor: "#016299",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 60,
  },
  userDescription: {
    height: "80%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
  },
  paragraph: {
    color: "#fff",
    marginTop: 10,
  },
  socialMediaSection: {
    flexDirection: "row",
    marginBottom: -30,
  },
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#f77599",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});
