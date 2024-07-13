import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";

const MuzeInput = ({ label, value, onChangeText, error, style, secureTextEntry }) => (
  <View style={[styles.inputContainer, style, error && { borderColor: "red" }]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const ChangePassword = ({ visible, setVisible }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!oldPassword) {
      errors.oldPassword = t("Old password is required");
      valid = false;
    }
    if (!newPassword) {
      errors.newPassword = t("New password is required");
      valid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = t("Passwords do not match");
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Add the function to handle password change here
      console.log("Password changed");
      setVisible(!visible);
    }
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
          <Text style={styles.modalTitle}>{t("Change Password")}</Text>
        </View>

        <MuzeInput
          label={t("Old Password")}
          value={oldPassword}
          onChangeText={setOldPassword}
          error={errors.oldPassword}
          secureTextEntry
        />
        <MuzeInput
          label={t("New Password")}
          value={newPassword}
          onChangeText={setNewPassword}
          error={errors.newPassword}
          secureTextEntry
        />
        <MuzeInput
          label={t("Confirm Password")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
        />

        <MuzeButton gradientStyle={{ width: width / 2 - 40 }} onPress={handleSubmit}>
          {t("Submit")}
        </MuzeButton>
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
    padding: 20,
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
});

export default ChangePassword;
