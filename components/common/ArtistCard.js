// Libs
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, Image, StyleSheet, ImageBackground } from "react-native";

// Redux
import { selectUser, setSearchedUserDetails } from "../../store/services/userSlice";

// Assets
const DjBg = `../../assets/Images/cards/dj-bg.png`;
const ArtistCardBg = `../../assets/Images/cards/artist-card-background.jpg`;

// Apis
import { getSearchedUserDetails } from "../../apis/user";

const ArtistCard = ({ id, artist }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const authToken = useSelector((state) => state.user.authToken);
  const userId = useSelector(selectUser).user.pk;

  const handlePress = () => {
    if (!authToken) {
      navigate("Sign In");
    }
    getSearchedUserDetails({ profileId: id }).then((res) => {
      if (res.data["Profile Details"].user.id === userId) {
        navigate("Profile");
      } else {
        dispatch(setSearchedUserDetails(res.data["Profile Details"]));
        navigate("Users");
      }
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Image
        source={artist.userImageUrl ? { uri: artist.userImageUrl } : require(DjBg)}
        style={styles.artistType}
      />
      <ImageBackground style={styles.artistInfo} source={require(ArtistCardBg)}>
        <View style={styles.titleContainer}>
          <Text style={styles.artistName}>
            {artist.firstName} {artist.lastName}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  artistInfo: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  artistType: {
    width: "33%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  artistName: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 28,
    color: "#ffffff",
    paddingLeft: 10,
  },
  artistRole: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 16,
    color: "rgba(255, 255, 255, 0.55)",
  },
  artistFollowers: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "rgba(255, 255, 255, 0.25)",
    alignSelf: "flex-end",
    marginTop: "auto",
    marginBottom: 7,
    marginRight: 2,
  },
});

export default ArtistCard;
