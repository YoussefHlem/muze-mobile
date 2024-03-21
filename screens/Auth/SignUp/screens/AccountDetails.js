// Libs
import React, { useState, useEffect, useMemo, useRef } from "react";
import Toast from "react-native-toast-message";

// Components
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-phone-number-input";
import RadioGroup from "react-native-radio-buttons-group";
import { BoxContainer, MuzeButton } from "../../../../components";
import MuzeDropdown from "../../../../components/common/MuzeDropdown";

// Constants
import { countries } from "../../../../constants/Countries";

// Redux
import { useDispatch } from "react-redux";
import { setIsUserSignUpDone } from "../../../../store/services/userSlice";
// Apis
import { signUpDone, updateProfile } from "../../../../apis/user";

const AccountDetails = ({ switchPage }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/Images/signup/Profile-Prefrences-Background.jpg")}
    >
      <BoxContainer
        style={{
          marginTop: 50,
          marginBottom: 100,
          paddingBottom: 30,
        }}
      >
        <ScrollView>
          <Text style={styles.title}>Let’s get introduced</Text>
          <ProfileForm switchPage={switchPage} />
        </ScrollView>
      </BoxContainer>
    </ImageBackground>
  );
};
const ProfileForm = ({ switchPage }) => {
  const dispatch = useDispatch();
  const radioButtons = useMemo(
    () => [
      {
        id: "male",
        label: "Male",
        value: "male",
      },
      {
        id: "female",
        label: "Female",
        value: "female",
      },
    ],
    []
  );
  const [location, setLocation] = useState("");
  const [selectedGender, setSelectedGender] = useState("male");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [phone, setPhone] = useState("");
  const submitHandler = async () => {
    if (!phone || !location || !date || !selectedGender) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }
    const data = {
      type: "add",
      phone: phone,
      country: location,
      birthDate: date.toISOString().slice(0, 10),
      gender: selectedGender,
    };
    updateProfile(data);
    const signUpResponse = await signUpDone();
    const isSignUpComplete =
      signUpResponse.data["Sign Up Process Done Boolean Val"];
    dispatch(setIsUserSignUpDone(isSignUpComplete));
    if (isSignUpComplete) {
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    }
  };

  return (
    <View style={{ alignSelf: "flex-start" }}>
      {showDate && (
        <DateTimePicker
          value={date}
          onChange={(value) => {
            setDate(new Date(value.nativeEvent.timestamp));
            setShowDate(false);
          }}
        />
      )}

      <Text
        style={{
          color: "#fff",
          marginBottom: 5,
          fontSize: 15,
        }}
      >
        What is your birthdate?
      </Text>
      <Pressable
        onPress={() => {
          setShowDate(!showDate);
        }}
      >
        <View style={styles.datePicker}>
          <Text style={styles.datePickerText}>
            {date.toISOString().slice(0, 10)}
          </Text>
        </View>
      </Pressable>

      <Text
        style={{
          color: "#fff",
          marginTop: 20,
          fontSize: 15,
        }}
      >
        What is your Gender?
      </Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedGender}
        selectedId={selectedGender}
        containerStyle={{
          display: "flex",
          flexDirection: "row",
        }}
        labelStyle={{
          color: "#fff",
        }}
      />
      <MuzeDropdown
        label="Where Are You Located?"
        data={countries.map((item) => ({ key: item, value: item }))}
        setSelected={(value) => {
          setLocation(value);
        }}
      />
      <Text
        style={{
          color: "#fff",
          marginTop: 20,
          marginBottom: 10,
          fontSize: 15,
        }}
      >
        Verify account with phone number
      </Text>
      <View>
        <PhoneInput
          defaultValue={phone}
          defaultCode="EG"
          layout="first"
          onChangeFormattedText={(text) => {
            setPhone(text);
          }}
          containerStyle={{
            backgroundColor: "transparent",
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#fff",
            borderRadius: 20,
          }}
          textContainerStyle={{
            backgroundColor: "transparent",
            borderRightWidth: 1,
            borderColor: "#fff",
            borderRadius: 20,
            marginLeft: -10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <MuzeButton
          onPress={switchPage}
          style={{ marginTop: 15, marginLeft: -25 }}
        >
          Back
        </MuzeButton>
        <MuzeButton
          onPress={submitHandler}
          style={{ marginTop: 15, marginRight: -25 }}
        >
          Next
        </MuzeButton>
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    lineHeight: 66,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 21,
  },
  subTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 200,
    height: 300,
    marginTop: 50,
  },
  profileImageText: {
    color: "#ffffff",
    fontSize: 14,
    alignSelf: "center",
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 13,
    borderRadius: 10,
  },
  datePickerText: {
    paddingLeft: 5,
  },
});
