import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import UserCover from "./UserCover";
import UserTabs from "./UserTabs";
import { useEffect } from "react";
import { getGenres, getMyStudios } from "../../apis/user";
import { useDispatch } from "react-redux";
import { setGenres, setUserStudios } from "../../store/services/userSlice";

const User = () => {
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
      <UserCover />
      <UserTabs />
    </ScrollView>
  );
};

export default ScreenWrapper(User);

const styles = StyleSheet.create({});
