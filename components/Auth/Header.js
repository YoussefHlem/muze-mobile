import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"; // Import Feather icons for back arrow

const AuthHeader = ({ AuthMode = "signIn" }) => {
  const { navigate, goBack } = useNavigation();

  const headerLogo = {
    signIn: (
      <Image
        source={require("../../assets/Images/auth_logo.png")}
        className="w-2/4 h-20"
        resizeMode={`contain`}
      />
    ),
    signUp: (
      <Pressable onPress={() => goBack()}>
        <Feather name="arrow-left" size={24} color="white" />
      </Pressable>
    ),
  };

  const headerText = {
    signIn: {
      main: "Sign in to your",
      sub: "Account",
    },
    signUp: {
      main: "Register",
      sub: null, // No subheader for signUp
    },
  };

  const footerText = {
    signIn: (
      <>
        <Text className="text-sm text-white">Don't have an account?</Text>
        <Pressable onPress={() => navigate("Sign Up")}>
          <Text className="text-[#4D81E7] underline">Sign Up</Text>
        </Pressable>
      </>
    ),
    signUp: (
      <>
        <Text className="text-sm text-white">Already have an account?</Text>
        <Pressable onPress={() => navigate("Sign In")}>
          <Text className="text-[#4D81E7] underline">Sign In</Text>
        </Pressable>
      </>
    ),
  };

  return (
    <ImageBackground
      source={require("../../assets/Images/auth-head-background.png")}
      className="p-6 pt-20"
    >
      <View>{headerLogo[AuthMode]}</View>
    </ImageBackground>
  );
};

export default AuthHeader;
