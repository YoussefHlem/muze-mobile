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
import { MuzeButton, PostModal } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

import { getSearchedUserDetails, getGenres } from "../../apis/user";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserDetails, setUserStudios } from "../../store/services/userSlice";

// Assets
const CoverImagePlaceholder = "../../assets/Images/profile-background-cover.png";
const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";

const InstagramIcon = `../../assets/Images/profile/instagram.png`;
const SoundcloudIcon = "../../assets/Images/profile/soundcloud.png";
const YoutubeIcon = "../../assets/Images/profile/youtube.png";
const SpotifyIcon = "../../assets/Images/profile/spotify.png";

const UserCover = ({ id }) => {
  const dispatch = useDispatch();
  const UserDetails = useSelector((state) => state.user.searchedUser);
  const { width, height } = useWindowDimensions();

  const [showModal, setShowModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const { user } = useSelector(selectUser);

  const socialMediaLinks = [
    { link: UserDetails.spotifyLink, icon: SpotifyIcon },
    { link: UserDetails.soundcloudLink, icon: SoundcloudIcon },
    { link: UserDetails.youtubeLink, icon: YoutubeIcon },
    { link: UserDetails.instagramLink, icon: InstagramIcon },
  ];

  useEffect(() => {
    // getSearchedUserDetails({ profileId: id }).then((res) => {
    //   setUserDetails(res.data["Profile Details"]);
    //   dispatch(setUserDetails(res.data["Profile Details"]));
    //   dispatch(setUserStudios(res.data["Owned Studio Rooms"]));
    // });
    getGenres().then((res) => dispatch(setGenres(res.data)));
  }, []);
  return (
    <View>
      <ImageBackground
        source={
          UserDetails?.userCoverImageUrl
            ? { uri: UserDetails?.userCoverImageUrl }
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
                  I am {UserDetails ? UserDetails.firstName : user.firstName}.
                </Text>
                <Text style={styles.paragraph}>
                  {UserDetails !== undefined && UserDetails.bio ? UserDetails.bio : "No bio yet"}
                </Text>
              </View>
              <View style={styles.socialMediaSection}>
                {UserDetails?.spotifyLink && (
                  <Pressable onPress={() => window.open(UserDetails.spotifyLink)}>
                    <Image source={require(SpotifyIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {UserDetails?.soundcloudLink && (
                  <Pressable onPress={() => window.open(UserDetails.soundcloudLink)}>
                    <Image source={require(SoundcloudIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {UserDetails?.youtubeLink && (
                  <Pressable onPress={() => window.open(UserDetails.youtubeLink)}>
                    <Image source={require(YoutubeIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {UserDetails?.instagramLink && (
                  <Pressable onPress={() => window.open(UserDetails.instagramLink)}>
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
        style={{ marginTop: 40, marginBottom: 20, justifyContent: "center", alignItems: "center" }}
      >
        <LinearGradient
          colors={["#016299", "#f77599"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ padding: 1, borderRadius: 10 }}
        >
          <Image
            source={
              UserDetails?.userImageUrl
                ? { uri: UserDetails?.userImageUrl }
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

export default UserCover;

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
