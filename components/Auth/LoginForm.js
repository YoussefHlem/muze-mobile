import { Image, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { signin } from "../../apis/user";
import { setItemAsync } from "expo-secure-store";
import { reloadAsync } from "expo-updates";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MuzeButton } from "../index";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values, actions) => {
    signin(values)
      .then(async (res) => {
        if (!res.data.Error) {
          Toast.show({
            type: "success",
            text1: "Login Successful 👋",
          });
          console.log(res.data);
          await setItemAsync("accessToken", res.data.accessToken);
          await setItemAsync("refreshToken", res.data.refreshToken);
          await setItemAsync("FormData", JSON.stringify(values));
          await reloadAsync();
        } else {
          Toast.show({
            type: "error",
            text1: res.data.Error,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#171717] p-5">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require("../../assets/Images/auth_logo.png")}
          className={`mx-auto mt-10 mb-16 w-[280px] h-[100px]`}
          resizeMode={`contain`}
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema} // Add validation schema
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View className="flex-1">
              <FormField
                name="email"
                label="Email"
                placeholder="loisbecket@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View className="mb-4 relative">
                <FormField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="absolute right-4 top-5"
                >
                  <Feather
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#ACAEBD"
                  />
                </TouchableOpacity>
              </View>

              <View className="mt-auto mb-20">
                <MuzeButton
                  gradientStyle={{ width: 200 }}
                  onPress={handleSubmit}
                >
                  {isSubmitting ? "Logging in..." : "Sign in"}
                </MuzeButton>
                <Text
                  className={`text-md text-[#B8BAC5BA] text-center tracking-wider mt-1`}
                >
                  Forgot password?
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginForm;
