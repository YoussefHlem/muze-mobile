import { Text, View } from "react-native";
import React from "react";

const TermsFooter = () => {
  return (
    <View className="mt-6 mb-6">
      <Text className="text-center text-gray-400 text-[14px] px-6 leading-5">
        By signing up, you agree to the{" "}
        <Text className="font-bold text-white">Terms of Service</Text> and{" "}
        <Text className="font-bold text-white">Data Processing Agreement</Text>
      </Text>
    </View>
  );
};

export default TermsFooter;
