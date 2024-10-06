import { Text, TextInput, View } from "react-native";
import { useField } from "formik";

const FormField = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View className="relative mb-8">
      <Text className="absolute z-10 -top-4 left-5 bg-[#171717] text-lg font-medium mb-1 text-gray-200">
        {label}
      </Text>
      <TextInput
        className={`w-full p-4 text-white text-md font-medium border border-gray-200 rounded-[20px] focus:outline-none focus:border-blue-500 ${meta.touched && meta.error && "border-red-500"}`}
        placeholderTextColor={"rgb(194,199,207)"}
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
