import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      {/* TODO:Replace The Activity Indicator With Wave Spinner */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
};

export default Loading;
