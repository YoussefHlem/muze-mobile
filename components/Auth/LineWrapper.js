import { View, StyleSheet } from "react-native";

const LineWrapper = ({ children }) => {
  return (
    <View style={styles.lineWrapper}>
      <View style={styles.leftLine}></View>
      {children}
      <View style={styles.rightLine}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
  leftLine: {
    width: "30%",
    height: 2,
    borderBottomWidth: 3,
    borderBottomColor: "white",
    marginRight: 12,
    borderRadius: 1,
  },
  rightLine: {
    width: "30%",
    height: 2,
    borderBottomWidth: 3,
    borderBottomColor: "white",
    marginLeft: 12,
    borderRadius: 1,
  },
});

export default LineWrapper;
