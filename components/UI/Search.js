// Libs
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Components
import { View, TextInput, Image, Text, StyleSheet, FlatList, Pressable } from "react-native";

// Apis
import { searchArtist } from "../../apis/search";
import { genres as getGenres, skills as getSkills } from "../../apis/utils";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult, setSearchList } from "../../store/services/searchSlice";

// Assets
const searchIcon = require("../../assets/Images/navbar/SearchIcon.png");

const Search = ({ placeholder }) => {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [genres, setGenres] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.search.allArtists);
  const searchList = useSelector((state) => state.search.searchList);

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res.data.genres);
    });
    getSkills().then((res) => {
      setSkills(res.data.skills);
    });
  }, []);

  const handleSubmit = () => {
    if (search) {
      searchArtist({ searchQuery: search })
        .then((res) => {
          dispatch(setSearchResult(res.data));
          navigation.navigate("SearchList");
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  const handleChange = (value) => {
    setSearch(value);
    if (value.length <= 5) {
      const list = data?.filter((d) => {
        let fullName = `${d?.firstName} ${d?.lastName}`;
        return fullName.toLowerCase().includes(value.toLowerCase());
      });
      const skillList = skills?.filter((d) => {
        return d.toLowerCase().includes(value.toLowerCase());
      });
      const genresList = genres?.filter((d) => {
        return d.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(setSearchList(list.concat(skillList).concat(genresList)));
    }
  };

  const handlePress = (value) => {
    if (value) {
      searchArtist({ searchQuery: value })
        .then((res) => {
          dispatch(setSearchResult(res.data));
          navigation.navigate("SearchList");
          setSearch("");
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder || "Search..."}
          value={search}
          onChangeText={(value) => handleChange(value)}
          placeholderTextColor={"#fff"}
        />
        <Pressable onPress={handleSubmit}>
          <Image source={searchIcon} style={{ width: 16, height: 16 }} />
        </Pressable>
        {searchList.length > 0 && search.length > 0 && (
          <FlatList
            data={searchList.slice(0, 5)}
            renderItem={({ item }) => (
              <Pressable onPress={() => handlePress(`${item.firstName} ${item.lastName}`)}>
                <View style={styles.searchResult}>
                  <Text style={styles.searchResultText}>
                    {item.firstName || item} {item.lastName || ""}
                  </Text>
                </View>
              </Pressable>
            )}
            style={styles.searchResults}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#737b8f",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    height: 25,
    width: "80%",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "#fff",
    fontSize: 13,
  },
  searchIcon: {
    padding: 5,
  },
  searchResults: {
    position: "absolute",
    top: 35,
    width: "107%",
    borderRadius: 10,
  },
  searchResult: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchResultText: {
    color: "#fff",
  },
});

export default Search;
