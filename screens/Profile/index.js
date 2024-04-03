import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import ProfileCover from "./ProfileCover";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfileCover />
      <ProfileTabs />
    </ScrollView>
  );
};

export default ScreenWrapper(Profile);

const styles = StyleSheet.create({});
