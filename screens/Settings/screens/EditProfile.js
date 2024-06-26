import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { MuzeButton } from "../../../components";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { updateProfile } from "../../../apis/user";
import { userTypes as userTypesApi } from "../../../apis/utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/services/userSlice";
import { useTranslation } from "react-i18next";

const MuzeInput = ({ label, value, onChangeText, error, style }) => (
  <View style={[styles.inputContainer, style, error && { borderColor: "red" }]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  </View>
);

const MuzeDropdown = ({ label, data, setSelected, onSelect, error, defaultOption }) => (
  <View style={[styles.dropDownContainer, error && { borderColor: "red" }]}>
    <Text style={styles.dropDownLabel}>{label}</Text>
    <MultipleSelectList
      boxStyles={styles.dropdown}
      data={data.map((item) => ({ key: item, value: item }))}
      search={false}
      setSelected={setSelected}
      onSelect={onSelect}
    />
  </View>
);

const EditProfile = ({ visible, setVisible }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const userDetails = useSelector((state) => state.user.userDetails);
  const { user } = useSelector(selectUser);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState([]);
  const [bio, setBio] = React.useState("");
  const [spotify, setSpotify] = React.useState("");
  const [soundCloud, setSoundCloud] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const [instagram, setInstagram] = React.useState("");

  const [errors, setErrors] = React.useState({});
  const [userTypes, setUserTypes] = React.useState([]);

  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
      setEmail(user.email);
      setUserType(userDetails.userTypes?.map((value) => value.name) || []);
      setBio(userDetails.bio);
      setSpotify(userDetails.spotifyLink);
      setSoundCloud(userDetails.soundcloudLink);
      setYoutube(userDetails.youtubeLink);
      setInstagram(userDetails.instagramLink);
    }
  }, [userDetails, user.email]);
  useEffect(() => {
    userTypesApi().then((res) => {
      setUserTypes(res.data.userTypes);
    });
  }, []);

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!firstName) {
      errors.firstName = t("First name is required");
      valid = false;
    }
    if (!lastName) {
      errors.lastName = t("Last name is required");
      valid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = t("A valid email is required");
      valid = false;
    }
    if (!userType || userType.length === 0) {
      errors.userType = t("User type is required");
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    const formData = {
      type: "add",
      firstName,
      lastName,
      email,
      userType: userType,
      bio,
      spotify,
      soundCloud,
      youtube,
      instagram,
    };
    if (validate()) {
      updateProfile(formData).then((res) => {
        console.log(res.data);
        setVisible(!visible);
      });
    }
  };

  const handleDeleteAccount = () => {
    // Add the function to handle account deletion here
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <BlurView
        intensity={50}
        style={styles.absolute}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      />
      <ScrollView contentContainerStyle={styles.centeredView}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => setVisible(!visible)}>
            <Text style={styles.modalTitle}>{t("Back")}</Text>
          </Pressable>
          <Text style={styles.modalTitle}>{t("Edit Profile")}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 30,
          }}
        >
          <MuzeInput
            label={t("First Name")}
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
            style={{ width: "47%" }}
          />
          <MuzeInput
            label={t("Last Name")}
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
            style={{ width: "47%" }}
          />
        </View>

        <MuzeInput label={t("Email")} value={email} onChangeText={setEmail} error={errors.email} />

        <MuzeDropdown
          label={t("User Type")}
          data={userTypes}
          setSelected={(value) => setUserType(value)}
          onSelect={(value) => console.log(value)}
          error={errors.userType}
          // defaultOption={userType[0]}
        />
        <MuzeInput
          label={t("Bio")}
          value={bio}
          onChangeText={setBio}
          error={errors.bio}
          style={{ marginTop: 25, minHeight: 100 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 30,
          }}
        >
          <MuzeInput
            label={t("Spotify")}
            value={spotify}
            onChangeText={setSpotify}
            error={errors.spotify}
            style={{ width: "47%" }}
          />
          <MuzeInput
            label={t("SoundCloud")}
            value={soundCloud}
            onChangeText={setSoundCloud}
            error={errors.soundCloud}
            style={{ width: "47%" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 30,
          }}
        >
          <MuzeInput
            label={t("YouTube")}
            value={youtube}
            onChangeText={setYoutube}
            error={errors.youtube}
            style={{ width: "47%" }}
          />
          <MuzeInput
            label={t("Instagram")}
            value={instagram}
            onChangeText={setInstagram}
            error={errors.instagram}
            style={{ width: "47%" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 30,
          }}
        >
          <MuzeButton gradientStyle={{ width: width / 2 - 80 }} onPress={handleSubmit}>
            {t("Submit")}
          </MuzeButton>
          <MuzeButton
            gradientStyle={{ width: width / 2 - 80, backgroundColor: "red" }}
            onPress={handleDeleteAccount}
          >
            {t("Delete Account")}
          </MuzeButton>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
    padding: 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
    backgroundColor: "#1c2839",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(218, 218, 218, 1)",
    marginTop: 16,
    marginLeft: 16,
  },
  input: {
    height: 35,
    marginHorizontal: 16,
    width: "100%",
    color: "#ffffff",
    paddingBottom: 16,
  },
  dropDownContainer: {
    width: "100%",
    marginBottom: 24,
    backgroundColor: "#1c2839",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  dropDownLabel: {
    fontSize: 14,
    color: "rgba(218, 218, 218, 1)",
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: "#1c2839",
    borderWidth: 0,
  },
});

export default EditProfile;
