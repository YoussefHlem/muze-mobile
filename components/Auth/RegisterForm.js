import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { signup } from "../../apis/user";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MuzeButton } from "../index";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const { navigate } = useNavigation();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (values, actions) => {
    signup({ ...values, acceptTermsConditions: true })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Account Created Successfully 😎",
          text2: "Activate It",
        });
        navigate("Sign In");
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: "error",
          text1: err,
        });
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#171717] p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/Images/auth_logo.png")}
          className={`mx-auto mt-10 mb-16 w-[280px] h-[100px]`}
          resizeMode={`contain`}
        />
        <Formik
          initialValues={{
            email: "",
            name: "",
            phoneNumber: "",
            password: "",
          }}
          validationSchema={validationSchema} // Add validation schema
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View>
              <FormField
                name="email"
                label="Email"
                placeholder="ahmedtamji@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FormField
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
              />
              <FormField
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
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
              <View className="mb-4 relative">
                <FormField
                  name="confirmPassword"
                  label="Confirm password"
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

              <MuzeButton gradientStyle={{ width: 200 }} onPress={handleSubmit}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </MuzeButton>
              <Text
                className={`text-md text-[#B8BAC5BA] text-center tracking-wider mt-2`}
              >
                Already have an account?{" "}
                <Text className={`font-medium text-[#8D90A0]`}>Sign in</Text>
              </Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterForm;
