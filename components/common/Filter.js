import React, { useRef } from "react";
import { View, TextInput, Pressable, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

// Assuming you have the SearchIconLogo imported correctly
const SearchIconLogo = require("../../assets/Images/navbar/SearchIcon.png");

const Filter = ({ original, input, handleInputChange, searchKeyWord }) => {
  const nameRef = useRef();
  const { t } = useTranslation();

  const handleChange = (text) => {
    input = original;
    const searchKey = searchKeyWord;
    const filteredData = input?.filter((ele) => {
      return searchKey
        ? ele[`${searchKey}`].toLowerCase().includes(text.toLowerCase()) ||
            (ele[`${searchKey}`] === null && text.length === 0)
        : ele.toLowerCase().includes(text.toLowerCase()) || (ele === null && text.length === 0);
    });
    handleInputChange(filteredData);
  };

  return (
    <View style={styles.mainSearchContainer}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBar}
          placeholder={`${t("search by keyword")}...`}
          placeholderTextColor="#fff"
          onChangeText={(text) => handleChange(text)}
          ref={nameRef}
        />
        <Pressable style={styles.searchIcon} onPress={() => {}}>
          <Image source={SearchIconLogo} style={{ width: 20, height: 20 }} resizeMode="contain" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainSearchContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#737b8f",
    backgroundColor: "transparent",
    paddingLeft: "1%",
    height: 50,
    minWidth: 350,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#fff",
    padding: 10,
  },
  searchIcon: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%",
  },
});

export default Filter;
