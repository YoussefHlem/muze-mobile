import React from "react";
import { View, Text, TextInput } from "react-native";
import { useField } from "formik";

const FormField = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View className="mb-5">
      <Text className="text-sm font-medium text-gray-600 mb-1">{label}</Text>
      <TextInput
        className={`w-full px-3 py-2 text-[#1A1C1E] text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 ${
          meta.touched && meta.error && "border-red-500"
        }`}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text className="text-xs text-red-500 mt-2 ml-1">{meta.error}</Text>
      ) : null}
    </View>
  );
};

export default FormField;
