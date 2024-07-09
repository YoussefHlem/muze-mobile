import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import i18next from "../../../services/i18next";
import { useTranslation } from "react-i18next";

const LanguageOption = ({ text, selected, onPress }) => {
  const { t } = useTranslation();
  const currentLanguage = i18next.language;

  return (
    <Pressable style={styles.optionContainer} onPress={onPress}>
      <Text style={styles.optionText}>{text}</Text>
      <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]} />
    </Pressable>
  );
};

const Language = ({ visible, setVisible }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English (UK)");

  const suggestedLanguages = ["Arabic", "English (UK)"];
  const otherLanguages = [
    "Mandarin",
    "Hindi",
    "Spanish",
    "French",
    "Arabic",
    "Russian",
    "Indonesian",
    "Vietnamese",
  ];

  const handleLanguageSelect = (language) => {
    if (language === "Arabic") {
      i18next.changeLanguage("ar");
    } else if (language === "English (UK)") {
      i18next.changeLanguage("en");
    }
    setSelectedLanguage(language);
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
      <View style={styles.centeredView}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => setVisible(!visible)}>
            <Text style={styles.modalTitle}>Back</Text>
          </Pressable>
          <Text style={styles.modalTitle}>Language</Text>
        </View>

        <View style={{ width: "100%" }}>
          <Text style={styles.sectionTitle}>Suggested</Text>
          {suggestedLanguages.map((language) => (
            <LanguageOption
              key={language}
              text={language}
              selected={selectedLanguage === language}
              onPress={() => handleLanguageSelect(language)}
            />
          ))}
        </View>

        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginVertical: 25,
          }}
        />

        <View style={{ width: "100%" }}>
          <Text style={styles.sectionTitle}>Others</Text>
          {otherLanguages.map((language) => (
            <LanguageOption
              key={language}
              text={language}
              selected={selectedLanguage === language}
              onPress={() => handleLanguageSelect(language)}
            />
          ))}
        </View>
      </View>
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
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  // headerContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: "100%",
  //   marginBottom: 20,
  // },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#81b0ff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    backgroundColor: "#81b0ff",
  },
});

export default Language;
