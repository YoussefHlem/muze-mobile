import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";

const ChangeLang = () => {
  const { t } = useTranslation();
  const currentLanguage = i18next.language;

  return (
    <View>
      <Text>{t("Some Text")}</Text>
      <Text>Current Language: {currentLanguage}</Text>
      <Button
        title="Change Language"
        onPress={() => {
          i18next.changeLanguage(currentLanguage === "en" ? "ar" : "en");
        }}
      />
    </View>
  );
};

export default ChangeLang;

const styles = StyleSheet.create({});
