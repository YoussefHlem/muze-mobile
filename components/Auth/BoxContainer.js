import { View, StyleSheet } from "react-native";

const BoxContainer = ({ style, children }) => {
  return <View style={[styles.box, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(244, 244, 244, 0.4)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: 10,
  },
});

export default BoxContainer;
