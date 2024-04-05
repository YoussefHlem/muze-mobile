import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import ProfileCover from "./ProfileCover";
import ProfileTabs from "./ProfileTabs";
import { useEffect } from "react";
import { getGenres, getMyStudios } from "../../apis/user";
import { useDispatch } from "react-redux";
import { setGenres, setUserStudios } from "../../store/services/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getGenres().then((res) => {
      dispatch(setGenres(res.data));
    });
    getMyStudios().then((res) => {
      dispatch(setUserStudios(res.data));
    });
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfileCover />
      <ProfileTabs />
    </ScrollView>
  );
};

export default ScreenWrapper(Profile);

const styles = StyleSheet.create({});
