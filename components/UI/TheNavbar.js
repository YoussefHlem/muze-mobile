import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import SearchModal from "./SearchModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/services/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const NavBarLogo = () => {
  const { user } = useSelector(selectUser);
  return (
    <View>
      <Text style={styles.userName}>
        Hello, {user?.firstName} {user?.lastName}!
      </Text>
    </View>
  );
};

const IconsContainer = ({ navigate }) => {
  return (
    <View style={styles.iconsContainer}>
      <Image source={require("../../assets/Icons/message.png")} />
      <Pressable onPress={() => navigate("Messaging")}>
        <Icon name="envelope" type="font-awesome" color="#CBCBCB" size={20} />
      </Pressable>
    </View>
  );
};

const TheNavbar = () => {
  const { navigate } = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <NavBarLogo />
        <IconsContainer navigate={navigate} />
        <SearchModal visible={isModalVisible} setVisible={setModalVisible} />
      </View>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="flex-row items-center bg-[#1B1B1B] rounded-xl shadow-sm px-4 py-2 w-11/12 mx-auto h-[48px] border border-[#737B8F] mb-5"
      >
        <TextInput
          className="flex-1 text-gray-200 placeholder:text-gray-400 text-[14px] font-rubik-regular"
          placeholder="Search.."
          placeholderTextColor="#6b7280"
          editable={false}
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="ml-2"
        >
          <Feather name={"search"} size={18} color="#6b7280" />
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
};

export default TheNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    zIndex: 99,
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  logoBig: {
    width: 125,
    height: 125,
    position: "absolute",
    left: 10,
  },
  logoSmallInvisible: {
    width: 35,
    height: 40,
    opacity: 0,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  userName: {
    // Style for the greeting text
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
