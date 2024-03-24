// Libs
import React, { useState, useEffect } from "react";

// Components
import { BoxContainer, MuzeButton } from "../../../../components";
import MuzeDropdown from "../../../../components/common/MuzeDropdown";
import * as ImagePicker from "expo-image-picker";
import { uploadBlob } from "../../../../services/BlobService";

import Toast from "react-native-toast-message";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Apis
import { genres, userTypes, skills, instruments } from "../../../../apis/utils";
import { updateProfile } from "../../../../apis/user";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserImage } from "../../../../store/services/userSlice";
import {
  setGenresList,
  setSkillsList,
  setUserTypes,
  setInstrumentsList,
} from "../../../../store/services/utilsSlice";

// Services

const ProfilePrefrences = ({ switchPage }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    genres().then((res) => {
      dispatch(setGenresList(res.data.genres));
    });
    userTypes().then((res) => {
      dispatch(setUserTypes(res.data.userTypes));
    });
    skills().then((res) => {
      dispatch(setSkillsList(res.data.skills));
    });
    instruments().then((res) => {
      dispatch(setInstrumentsList(res.data.instruments));
    });
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/Images/signup/Profile-Prefrences-Background.jpg")}
    >
      <BoxContainer
        style={{
          marginTop: 50,
          marginBottom: 100,
          paddingBottom: 30,
        }}
      >
        <ScrollView>
          <TextForm />
          <ProfileForm switchPage={switchPage} />
        </ScrollView>
      </BoxContainer>
    </ImageBackground>
  );
};

const TextForm = () => {
  const { user } = useSelector(selectUser);
  const [image, setImage] = useState(null);

  const handleProfilePhotoSelection = async () => {
    console.log("Test");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const newImageBlob = await uploadBlob(image, "img");
    if (newImageBlob.blobUrl) {
      // if image uploaded delete old one if not the default img
      dispatch(setUserImage(newImageBlob));
    }
    console.log(newImageBlob);
    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <>
      <Text style={styles.title}>Tell the world who you are</Text>
      <Text style={styles.subTitle}>Profile Photo</Text>
      <Text style={styles.text}>
        To upload image click on box or drop file here!
      </Text>
      <Pressable
        onPress={handleProfilePhotoSelection}
        style={{ alignSelf: "center" }}
      >
        <Image
          source={{
            uri: user.userImage.blobUrl
              ? user.userImage.blobUrl
              : "https://muzefirststorage.blob.core.windows.net/usercontainer/img/img-1687160459492",
          }}
          style={styles.profileImage}
        />
      </Pressable>
      <Text style={styles.profileImageText}>JPG should be 1920 by 1080px.</Text>
    </>
  );
};
const ProfileForm = ({ switchPage }) => {
  const [genres, setGenres] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [skills, setSkills] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [prefrences, setPrefrences] = useState({
    type: "add",
    userImageName: "",
    userImageUrl: "",
    genres: genres,
    userTypes: userTypes,
    instrumentsSkill: instruments,
    lookingForSkills: skills,
  });

  const submitHandler = () => {
    const isValid = () => {
      if (
        !genres.length ||
        !userTypes.length ||
        !instruments.length ||
        !skills.length
      ) {
        return false;
      }
      return true;
    };

    if (!isValid()) {
      Toast.show({
        type: "error",
        text1: "Please Complete The Form",
      });
      return;
    }

    const profileData = {
      ...prefrences,
      genres: genres,
      userTypes: userTypes,
      instrumentsSkill: instruments,
      lookingForSkills: skills,
    };

    updateProfile(profileData)
      .then(() => {
        switchPage();
      })
      .catch((err) => console.log(err));
  };

  const genresData = useSelector((state) => state.utils.genresList);
  const userTypesData = useSelector((state) => state.utils.userTypes);
  const skillsData = useSelector((state) => state.utils.skillsList);
  const instrumentsData = useSelector((state) => state.utils.instruments);

  return (
    <View style={{ alignSelf: "flex-start" }}>
      <MuzeDropdown
        label="What type of user are you?"
        data={userTypesData.map((item) => ({ key: item, value: item }))}
        isMulti
        setSelected={(value) => {
          setUserTypes(value);
        }}
      />
      <MuzeDropdown
        label="What are your favorite genres?"
        data={genresData.map((item) => ({ key: item, value: item }))}
        isMulti
        setSelected={(value) => setGenres(value)}
      />
      <MuzeDropdown
        label="What are you looking for?"
        data={skillsData.map((item) => ({ key: item, value: item }))}
        isMulti
        setSelected={(value) => setSkills(value)}
      />
      <MuzeDropdown
        label="What instruments do you play?"
        data={instrumentsData.map((item) => ({ key: item, value: item }))}
        isMulti
        setSelected={(value) => setInstruments(value)}
      />
      <MuzeButton
        onPress={submitHandler}
        style={{ alignSelf: "flex-end", marginTop: 15, marginRight: -25 }}
      >
        Next
      </MuzeButton>
    </View>
  );
};

export default ProfilePrefrences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    lineHeight: 66,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 21,
  },
  subTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 200,
    height: 300,
    marginTop: 50,
  },
  profileImageText: {
    color: "#ffffff",
    fontSize: 14,
    alignSelf: "center",
  },
});
