import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { MuzeButton } from "../../../components";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { updateProfile } from "../../../apis/user";
import { userTypes as userTypesApi } from "../../../apis/utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/services/userSlice";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const MuzeInput = ({ label, value, onChangeText, error, style }) => (
  <View style={[styles.inputContainer, style, error && { borderColor: "red" }]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#666"
    />
  </View>
);

const MuzeDropdown = ({
  label,
  data,
  setSelected,
  onSelect,
  error,
  defaultOption,
}) => (
  <View style={[styles.dropDownContainer, error && { borderColor: "red" }]}>
    <Text style={styles.dropDownLabel}>{label}</Text>
    <MultipleSelectList
      boxStyles={styles.dropdown}
      data={data.map((item) => ({ key: item, value: item }))}
      search={false}
      setSelected={setSelected}
      onSelect={onSelect}
      badgeTextStyles={{ color: "#000" }}
      dropdownTextStyles={{ color: "#000" }}
      inputStyles={{ color: "#000" }}
    />
  </View>
);

// ... rest of the component logic remains the same ...

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
      <View style={styles.modalBackground}>
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
              gap: 20,
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

          <MuzeInput
            label={t("Email")}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

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
              gap: 20,
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
              gap: 20,
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
            <MuzeButton
              gradientStyle={{ width: width / 2 - 80 }}
              onPress={handleSubmit}
            >
              {t("Submit")}
            </MuzeButton>
            <MuzeButton
              gradientStyle={{
                width: width / 2 - 80,
                backgroundColor: "red",
              }}
              onPress={handleDeleteAccount}
            >
              Delete
            </MuzeButton>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#171717",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
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
    marginBottom: 15,
    backgroundColor: "#f5f5f7",
    borderColor: "#e2e2e7",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    color: "#2f2f3b",
    marginTop: 16,
    marginLeft: 16,
    fontWeight: "500",
  },
  input: {
    height: 35,
    marginHorizontal: 16,
    width: "85%",
    color: "#424250",
    paddingBottom: 16,
  },
  dropDownContainer: {
    width: "100%",
    marginBottom: 24,
    backgroundColor: "#ffffff",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dropDownLabel: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 8,
    fontWeight: "500",
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderWidth: 0,
    color: "#000000",
  },
});

export default EditProfile;
