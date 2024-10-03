import { Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { signup } from "../../apis/user";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

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
    <View className="p-5 -mt-5">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View>
            <View className="flex-row space-x-5">
              <View className="flex-1">
                <FormField
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  autoCapitalize="words"
                  placeholderTextColor="gray"
                  className="text-white"
                />
              </View>
              <View className="flex-1">
                <FormField
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  autoCapitalize="words"
                  placeholderTextColor="gray"
                  className="text-white"
                />
              </View>
            </View>
            <FormField
              name="email"
              label="Email"
              placeholder="johndoe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="gray"
              className="text-white"
            />
            <View className="relative">
              <FormField
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                placeholderTextColor="gray"
                className="text-white"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-3 top-9"
              >
                <Feather name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="mb-4 relative">
              <FormField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry={!confirmPasswordVisible}
                placeholderTextColor="gray"
                className="text-white"
              />
              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-9"
              >
                <Feather name={confirmPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#4D81E7" : undefined}
                  className="mr-2 w-3.5 h-3.5"
                />
                <Text className="text-sm text-gray-400 font-medium">Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm text-blue-400 font-medium">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`bg-blue-600 p-4 rounded-[10px] mb-4 drop-shadow ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              <Text className="text-white text-center font-medium text-sm">
                {isSubmitting ? "Registering..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterForm;
