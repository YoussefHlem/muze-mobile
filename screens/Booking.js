import { Button, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../hoc/ScreenWrapper";
import { deleteItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/services/userSlice";

const Booking = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = async () => {
    await deleteItemAsync("accessToken");
    dispatch(setAuthToken(null));
    navigation.navigate("Sign In");
  };
  return (
    <View>
      <Text>Booking</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default ScreenWrapper(Booking);

const styles = StyleSheet.create({});
