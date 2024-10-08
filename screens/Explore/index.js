// Libs
import React, { useEffect, useState } from "react";

// Components
import ScreenWrapper from "../../hoc/ScreenWrapper";

// Apis
import { getAllArtists } from "../../apis/search";
import { signin } from "../../apis/user";

// Redux
import { setAllArtists } from "../../store/services/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthToken,
  setIsUserSignUpDone,
  setUser,
} from "../../store/services/userSlice";

// Screens
import ProfilePrefrences from "../Auth/SignUp/screens/ProfilePrefrences";
import AccountDetails from "../Auth/SignUp/screens/AccountDetails";
import Tabs from "./Tabs";
import { getItemAsync } from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

const Explore = () => {
  const dispatch = useDispatch();

  const isSignUpDone = useSelector((state) => state.user.isSignUpDone);

  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState({});

  const switchPage = () => setActivePage((prevState) => prevState + 1);
  const prevPage = () => setActivePage((prevState) => prevState - 1);

  useEffect(() => {
    getAllArtists().then((res) => {
      dispatch(setAllArtists(res.data));
    });
  }, []);

  useFocusEffect(() => {
    (async () => {
      const formData = await getItemAsync("FormData");
      if (formData) {
        setFormData(JSON.parse(formData));
      }
    })();
    signin(formData)
      .then((res) => {
        if (!res.data.Error) {
          dispatch(setUser(res.data));
          dispatch(setIsUserSignUpDone(res.data.signUpDone));
          dispatch(setAuthToken(res.data.accessToken));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

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

  return <>{isSignUpDone === false ? handleSwitchScreen() : <Tabs />}</>;
};

export default ScreenWrapper(Explore);
