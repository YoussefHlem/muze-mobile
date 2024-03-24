// Livs
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

// Components
import ScreenWrapper from "../hoc/ScreenWrapper";

// Apis
import { getAllArtists } from "../apis/search";

// Redux
import { setAllArtists } from "../store/services/searchSlice";
import { useDispatch, useSelector } from "react-redux";

// Screens
import ProfilePrefrences from "./Auth/SignUp/screens/ProfilePrefrences";
import AccountDetails from "./Auth/SignUp/screens/AccountDetails";

const Explore = () => {
  const dispatch = useDispatch();
  const isSignUpDone = useSelector((state) => state.user.isSignUpDone);

  const [activePage, setActivePage] = useState(0);

  const switchPage = () => setActivePage((prevState) => prevState + 1);
  const prevPage = () => setActivePage((prevState) => prevState - 1);

  useEffect(() => {
    getAllArtists().then((res) => {
      dispatch(setAllArtists(res.data));
    });
  }, []);

  const handleSwitchScreen = () => {
    switch (activePage) {
      case 0:
        return <ProfilePrefrences switchPage={switchPage} />;
      case 1:
        return <AccountDetails switchPage={prevPage} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {isSignUpDone === false ? (
        handleSwitchScreen()
      ) : (
        <View>
          <Text>Explore</Text>
        </View>
      )}
    </>
  );
};

export default ScreenWrapper(Explore);

const styles = StyleSheet.create({});
