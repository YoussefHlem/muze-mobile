import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import ProfileCover from "./ProfileCover";
import ProfileTabs from "./ProfileTabs";
import { useEffect } from "react";
import { getAllDetails, getGenres, getMyStudios } from "../../apis/user";
import { useDispatch } from "react-redux";
import { setGenres, setUserStudios, setUserDetails } from "../../store/services/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getGenres().then((res) => {
      dispatch(setGenres(res.data));
    });
    getMyStudios().then((res) => {
      dispatch(setUserStudios(res.data));
    });
    getAllDetails().then((res) => {
      console.log(res.data["Profile Details"]);
      dispatch(setUserDetails(res.data["Profile Details"]));
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
