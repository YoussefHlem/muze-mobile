import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { isFollowing, requestFollow } from "../../apis/users";
import { useTranslation } from "react-i18next";
import TwoButtons from "../../components/common/TwoButtons";

// Assets
const CoverImagePlaceholder = "../../assets/Images/profile-background-cover.png";
const ProfileImagePlaceholder = "../../assets/Images/common/user.jpg";

const InstagramIcon = `../../assets/Images/profile/instagram.png`;
const SoundcloudIcon = "../../assets/Images/profile/soundcloud.png";
const YoutubeIcon = "../../assets/Images/profile/youtube.png";
const SpotifyIcon = "../../assets/Images/profile/spotify.png";

const UserCover = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const UserDetails = useSelector((state) => state.user.searchedUser);
  const { width, height } = useWindowDimensions();
  const [isFollowingState, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (UserDetails) {
      isFollowing({ profileId: UserDetails.user.id })
        .then((res) => {
          setIsFollowing(res?.data?.isFollowing);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [UserDetails]);

  const handleFollowRequest = () => {
    requestFollow({ profileId: UserDetails.user.id })
      .then((res) => {
        if (res.data?.Response === "Profile Followed") {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <ImageBackground
        source={
          UserDetails?.userCoverImageUrl
            ? { uri: UserDetails?.userCoverImageUrl }
            : require(CoverImagePlaceholder)
        }
        style={{ width: width, height: height / 3 + 40 }}
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
                  <Pressable onPress={() => Linking.openURL(UserDetails.spotifyLink)}>
                    <Image source={require(SpotifyIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {UserDetails?.soundcloudLink && (
                  <Pressable onPress={() => Linking.openURL(UserDetails.soundcloudLink)}>
                    <Image source={require(SoundcloudIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {UserDetails?.youtubeLink && (
                  <Pressable onPress={() => Linking.openURL(UserDetails.youtubeLink)}>
                    <Image source={require(YoutubeIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
                {UserDetails?.instagramLink && (
                  <Pressable onPress={() => Linking.openURL(UserDetails.instagramLink)}>
                    <Image source={require(InstagramIcon)} style={styles.socialMediaIcon} />
                  </Pressable>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>

      <TwoButtons
        onePress1={() => navigate("Messaging")}
        text1={"Message"}
        onPress2={handleFollowRequest}
        text2={isFollowingState ? "Unfollow" : "Follow"}
      />
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
    marginTop: 10,
    flexDirection: "row",
  },
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#f77599",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
