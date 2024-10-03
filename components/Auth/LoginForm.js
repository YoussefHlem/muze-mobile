import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import FormField from "./FormField";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { signin } from "../../apis/user";
import { setItemAsync } from "expo-secure-store";
import { reloadAsync } from "expo-updates";
import Toast from "react-native-toast-message";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

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
    <View className="p-5 -mt-5">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema} // Add validation schema
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View>
            <FormField
              name="email"
              label="Email"
              placeholder="loisbecket@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="gray"
              className="text-white"
            />
            <View className="mb-4 relative">
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
                {isSubmitting ? "Logging in..." : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
