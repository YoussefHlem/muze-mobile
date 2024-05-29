import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { passwordLinkActivation } from "../../apis/user";
import BoxContainer from "./BoxContainer";
import MuzeButton from "../common/MuzeButton";

const ForgetPasswordModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const sendLinkHandler = () => {
    passwordLinkActivation({ email })
      .then(() => {
        Toast.show({ type: "success", text1: "Password reset link sent successfully" });
        onClose();
      })
      .catch((err) => {
        Toast.show({ type: "error", text1: "Failed to send password reset link" });
        console.error(err);
      });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <BoxContainer style={styles.boxContainer}>
          <Text style={styles.title}>Enter your email address</Text>
          <TextInput
            style={styles.input}
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder={t("email")}
            value={email}
            onChangeText={handleEmailChange}
          />
          <MuzeButton onPress={sendLinkHandler}>Send Link</MuzeButton>
          <Pressable onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </Pressable>
        </BoxContainer>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  boxContainer: {
    padding: 20,
    backgroundColor: "#171717",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    fontSize: 32,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    color: "#fff",
  },
  closeButton: {
    color: "#1d69a7",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});

export default ForgetPasswordModal;
