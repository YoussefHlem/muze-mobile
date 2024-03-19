import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../hoc/ScreenWrapper";
import { getAllArtists } from "../apis/search";
import { setAllArtists } from "../store/services/searchSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllArtists().then((res) => {
      dispatch(setAllArtists(res.data));
      console.log(res.data);
    });
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default ScreenWrapper(Home);

const styles = StyleSheet.create({});
