// Libs
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// Components
import {
  BoxContainer,
  MuzeInput,
  MuzeButton,
  LineWrapper,
} from "../../../components";

// Apis
import { signup } from "../../../apis/user";

const SignUp = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Images/signup/signup-background.jpg")}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          <BoxContainer>
            <View style={styles.innerContainer}>
              <SignUpText navigation={navigation} t={t} />
              <SignUpForm navigation={navigation} t={t} />
            </View>
          </BoxContainer>
        </View>
      </ImageBackground>
    </View>
  );
};

// Mini Components

const SignUpText = ({ navigation, t }) => {
  return (
    <>
      <Text style={styles.title}>{t("getStarted")}</Text>
      <View style={styles.anchorContainer}>
        <Text style={styles.subTitle}>{t("alreadyHaveAnAccount")}</Text>
        <Pressable onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.anchor}>{t("signIn")}</Text>
        </Pressable>
      </View>
    </>
  );
};

const SignUpForm = ({ t, navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTermsConditions: false,
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(false);
  };

  const handleSubmit = () => {
    console.log(formData);
    signup(formData)
      .then(async (res) => {
        setError(false);
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Account Created Successfully 👋",
          text2: "Activate It",
        });
        navigation.navigate("Sign In");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        Toast.show({
          type: "error",
          text1: res.data.Error,
        });
      });
  };

  return (
    <View>
      <View style={styles.nameContainer}>
        <MuzeInput
          type="name"
          placeholder={t("firstName")}
          value={formData.firstName}
          onChange={(text) => handleChange("firstName", text)}
          isDark={true}
          required={true}
          style={{
            borderColor: error ? "#ff0000" : "#fff",
          }}
        />
        <MuzeInput
          type="name"
          placeholder={t("lastName")}
          value={formData.lastName}
          onChange={(text) => handleChange("lastName", text)}
          isDark={true}
          required={true}
          style={{
            borderColor: error ? "#ff0000" : "#fff",
          }}
        />
      </View>
      <MuzeInput
        type="email"
        placeholder={t("email")}
        value={formData.email}
        onChange={(text) => handleChange("email", text)}
        isDark={true}
        required={true}
        style={{
          borderColor: error ? "#ff0000" : "#fff",
        }}
      />
      <View style={styles.passwordContainer}>
        <MuzeInput
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder={t("password")}
          value={formData.password}
          onChange={(text) => handleChange("password", text)}
          isDark={true}
          style={{
            borderColor: error ? "#ff0000" : "#fff",
          }}
        />
        <Pressable
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name="eye" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.passwordContainer}>
        <MuzeInput
          type={showConfirmPassword ? "text" : "password"}
          id="password"
          placeholder={t("confirmPassword")}
          value={formData.password}
          onChange={(text) => handleChange("confirmPassword", text)}
          isDark={true}
          style={{
            borderColor: error ? "#ff0000" : "#fff",
          }}
        />
        <Pressable
          style={styles.icon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons name="eye" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.termsAndConditions}>
        <CheckBox
          value={formData.acceptTermsConditions}
          checked={formData.acceptTermsConditions}
          onPress={() =>
            handleChange(
              "acceptTermsConditions",
              !formData.acceptTermsConditions
            )
          }
        />
        <View style={styles.termsContainer}>
          <Text style={{ color: "#fff" }}>
            I read and accepted the{" "}
            <Pressable onPress={() => setShowModal(true)}>
              <Text style={styles.link}>Terms</Text>
            </Pressable>{" "}
            and{" "}
            <Pressable onPress={() => setShowModal(true)}>
              <Text style={styles.link}>Conditions</Text>
            </Pressable>
          </Text>
        </View>
      </View>

      <MuzeButton onPress={handleSubmit}> {t("signUp")}</MuzeButton>
      <LineWrapper>
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          {t("orSignUpWith")}
        </Text>
      </LineWrapper>
      <View style={styles.iconsContainer}>
        <Pressable style={styles.iconWrapper}>
          <Image
            source={require("../../../assets/Images/common/Google-Logo.png")}
          />
        </Pressable>
        <Pressable style={styles.iconWrapper}>
          <Image
            source={require("../../../assets/Images/common/FB-Logo.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  innerContainer: {
    padding: 20,
    paddingHorizontal: 40,
  },
  title: {
    fontWeight: "700",
    lineHeight: 66,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 28,
  },
  anchorContainer: {
    flexDirection: "row",
    justifyContent: "left",
    width: "100%",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 20,
    gap: 10,
  },
  subTitle: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "600",
  },
  anchor: {
    color: "#1d69a7",
    textDecorationLine: "underline",
    marginLeft: "0.5%",
    fontWeight: "600",
  },
  passwordContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
    zIndex: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  iconWrapper: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  nameContainer: {
    flexDirection: "row",
    width: "45%",
    gap: 25,
  },
  termsAndConditions: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  termsContainer: {
    marginLeft: 10,
  },
  link: {
    color: "#2d9cdb",
  },
});
