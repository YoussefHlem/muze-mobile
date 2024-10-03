import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { submitFeedback } from "../../../apis/user";
import ScreenWrapper from "../../../hoc/ScreenWrapper";

const HelpSupport = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const screens = [
    "Explore",
    "Home",
    "Profile",
    "Booking",
    "Signin",
    "Signup",
    "Video Screen",
    "Settings",
    "Collaborations",
  ];

  const formHasErrors = () => {
    return !(screen.length && details.length >= 10);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (formHasErrors()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please choose a screen and fill up the details",
      });
      setIsLoading(false);
      return;
    }

    try {
      await submitFeedback({
        title: screen,
        content: details,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Feedback submitted successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to submit feedback",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4A9E4" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Help Us Improve</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={screen}
            onValueChange={(value) => setScreen(value)}
            style={styles.picker}
          >
            <Picker.Item label="Choose a screen" value="" />
            {screens.map((value) => (
              <Picker.Item key={value} label={t(value)} value={value} />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={10}
          placeholder="Details minimum text is 10 letters"
          placeholderTextColor={"#999"}
          value={details}
          onChangeText={setDetails}
          maxLength={200}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 20,
    paddingBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  picker: {
    color: "#000",
  },
  textArea: {
    color: "#fff",
    backgroundColor: "#333",
    height: 300,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 15,
    textAlignVertical: "top",
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#dfb3ef",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ScreenWrapper(HelpSupport);
