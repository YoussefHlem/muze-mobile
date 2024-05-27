import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { collaborationCreate } from "../../../apis/collaboration";
import { genres as getGenres, skills as getSkills } from "../../../apis/utils";
import { setGenresList } from "../../../store/services/searchSlice";
import Toast from "react-native-toast-message";
import { MuzeButton } from "../../../components";
import { setSkillsList } from "../../../store/services/utilsSlice";
import MuzeDropdown from "../../../components/common/MuzeDropdown";

const PostCollabModal = ({ isVisible, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [skillsInput, setSkillsInput] = useState([]);
  const [genresInput, setGenresInput] = useState([]);

  const [inputsData, setInputsData] = useState({
    applicationDeadline: "",
    description: "",
    experienceLevel: "",
    location: "",
    lookingForSkill: [],
    genre: [],
    title: "",
  });

  const [genresArr, setGenresArr] = useState([]);
  const [skillsArr, setSkillsArr] = useState([]);

  const onChange = (name, value) => {
    setInputsData({ ...inputsData, [name]: value });
  };

  const checkMissingInputs = () => {
    const requiredFields = [
      "title",
      "experienceLevel",
      "location",
      "lookingForSkill",
      "genre",
      "applicationDeadline",
      "description",
    ];
    return requiredFields.some((field) => !inputsData[field]);
  };

  const onSubmit = async () => {
    const data = { ...inputsData, lookingForSkill: skillsInput, genre: genresInput };
    if (!checkMissingInputs()) {
      collaborationCreate(data).then(() => {
        Toast.show({ type: "success", text1: t("Collaboration created") });
        setInputsData({
          applicationDeadline: "",
          description: "",
          experienceLevel: "",
          location: "",
          lookingForSkill: [],
          genre: [],
          title: "",
        });
      });
      onClose();
    } else {
      toast.show({ type: "error", text1: t("Please fill in all fields") });
    }
  };

  useEffect(() => {
    getGenres().then((res) => {
      setGenresArr(res?.data?.genres);
      dispatch(setGenresList(res?.data?.genres));
    });
    getSkills().then((res) => {
      setSkillsArr(res?.data?.skills);
      dispatch(setSkillsList(res?.data?.skills));
    });
  }, []);

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
      <ImageBackground
        source={require("../../../assets/Images/background-dark-img.png")}
        style={styles.container}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.content}>
          <View style={styles.formSection}>
            <Text style={styles.label}>{t("Title")}:</Text>
            <TextInput
              style={styles.input}
              value={inputsData.title}
              onChangeText={(text) => onChange("title", text)}
              placeholder={t("Max 45 characters")}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>{t("Experience Level")}:</Text>
            <TextInput
              style={styles.input}
              value={inputsData.experienceLevel}
              onChangeText={(text) => onChange("experienceLevel", text)}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>{t("Location")}:</Text>
            <TextInput
              style={styles.input}
              value={inputsData.location}
              onChangeText={(text) => onChange("location", text)}
            />
          </View>

          <View style={styles.formSection}>
            <MuzeDropdown
              label={t("Looking For")}
              data={skillsArr.map((item) => ({ key: item, value: item }))}
              isMulti
              setSelected={(value) => setSkillsInput(value)}
            />
          </View>

          <View style={styles.formSection}>
            <MuzeDropdown
              label={t("Genres")}
              data={genresArr.map((item) => ({ key: item, value: item }))}
              isMulti
              setSelected={(value) => setGenresInput(value)}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>{t("Application Deadline")}:</Text>
            <TextInput
              style={styles.input}
              value={inputsData.applicationDeadline}
              onChangeText={(text) => onChange("applicationDeadline", text)}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>{t("Description")}:</Text>
            <TextInput
              style={styles.descriptionInput}
              value={inputsData.description}
              onChangeText={(text) => onChange("description", text)}
              multiline
            />
          </View>
          <MuzeButton onPress={onSubmit}>{t("Submit")}</MuzeButton>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#171717",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formSection: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PostCollabModal;
