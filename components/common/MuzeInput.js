import { TextInput, StyleSheet } from "react-native";

const MuzeInput = ({
  type,
  placeholder,
  onChange,
  required,
  isDark,
  style,
}) => {
  return (
    <TextInput
      style={[styles.input, { color: isDark ? "#ffffff" : "#000000" }, style]}
      placeholderTextColor="#ffffff"
      placeholder={placeholder}
      onChangeText={onChange}
      secureTextEntry={type === "password"}
      autoCapitalize="none"
      required={required}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "transparent",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.204545,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    marginBottom: 10,
    zIndex: 2,
  },
});

export default MuzeInput;
