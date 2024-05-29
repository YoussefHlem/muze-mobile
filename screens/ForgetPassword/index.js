// Libraries
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

// Services
import { passwordCheckToken, passwordReset } from "../../apis/user";

// Components
import BoxContainer from "../../components/Auth/BoxContainer";
import MuzeButton from "../../components/common/MuzeButton";
import MuzeInput from "../../components/common/MuzeInput";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../hoc/ScreenWrapper";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const isActivated = route.params?.activated;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isActivated) {
      Alert.alert(t("accountActivated"));
    }
  }, [isActivated, t]);

  useEffect(() => {
    passwordCheckToken();
  }, []);

  const handleSubmit = async () => {
    if (formData.password.length < 6) {
      Alert.alert(t("passwordMinLength"));
      return;
    }
    if (formData.password === formData.confirmPassword) {
      passwordReset({ password: formData.password })
        .then(() => {
          Alert.alert(t("passwordResetSuccess"));
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(t("passwordResetError"));
        });
    } else {
      Alert.alert(t("passwordMismatch"));
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <View style={styles.container}>
      <BoxContainer style={{ padding: 20 }}>
        <Text style={styles.title}>Type New Password</Text>
        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <MuzeInput
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder={t("password")}
              name="password"
              onChangeText={(text) => handleChange("password", text)}
              isDark={true}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.passwordContainer}>
            <MuzeInput
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder={t("confirmPassword")}
              name="confirmPassword"
              onChangeText={(text) => handleChange("confirmPassword", text)}
              isDark={true}
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.spacer} />
          <MuzeButton onPress={handleSubmit}>Change Password</MuzeButton>
        </View>
      </BoxContainer>
    </View>
  );
};

export default ScreenWrapper(ForgetPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 28,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
});
