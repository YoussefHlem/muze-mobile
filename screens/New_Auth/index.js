import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MuzeButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";
import { BackgroundImage } from "react-native-elements/dist/config";
// Assets
const mainLogo = require("../../assets/Images/navbar/navbar-dark-logo.png");

const Auth = () => {
  const { navigate } = useNavigation();
  (async () => {
    const token = await getItemAsync("accessToken");
    if (token) navigate("Home");
    else navigate("Auth");
    return token;
  })();
  return (
    <SafeAreaView style={styles.container}>
      <BackgroundImage
        source={require("../../assets/Images/auth-background.png")}
        style={styles.background}
      >
        <View style={styles.content}>
          <Image source={mainLogo} style={styles.logo} />
          <Text style={styles.subtitle}>Create a Free account</Text>
          <MuzeButton
            onPress={() => navigate("Sign Up")}
            gradientStyle={{ width: 275 }}
          >
            Create an account
          </MuzeButton>
          <MuzeButton
            onPress={() => navigate("Sign In")}
            gradientStyle={{ width: 275 }}
          >
            Sign In
          </MuzeButton>
        </View>
      </BackgroundImage>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 400,
    height: 100,
  },
  background: {
    flex: 1,
  },
  subtitle: {
    fontSize: 24,
    color: "#A0A0A0",
    marginBottom: 200,
    letterSpacing: 1,
  },
  createAccountButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 25,
    width: "75%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: "#2A2A2A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "75%",
    alignItems: "center",
  },
  signInText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
