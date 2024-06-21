import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { MuzeButton } from "../../../components";
import PhoneInput from "react-native-phone-number-input";
import { countries } from "../../../constants/Countries";
import { SelectList, MultipleSelectList } from "react-native-dropdown-select-list";
import Toast from "react-native-toast-message";

const MuzeInput = ({ label, value, onChangeText, style }) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  </View>
);

const MuzeDropdown = ({ label, data, setSelected, isMulti, onSelect }) => {
  return (
    <View style={styles.dropDownContainer}>
      <Text style={styles.dropDownLabel}>{label}</Text>
      {isMulti ? (
        <MultipleSelectList
          boxStyles={styles.dropdown}
          data={data}
          search={false}
          setSelected={setSelected}
          onSelect={onSelect}
        />
      ) : (
        <SelectList
          boxStyles={styles.dropdown}
          data={data}
          search={false}
          setSelected={setSelected}
          onSelect={onSelect}
        />
      )}
    </View>
  );
};

const EditProfile = ({ visible, setVisible }) => {
  const { width } = useWindowDimensions();
  const [fullName, setFullName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!fullName) {
      errors.fullName = "Full name is required";
      valid = false;
    }
    if (!username) {
      errors.username = "Username is required";
      valid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "A valid email is required";
      valid = false;
    }
    if (!phone) {
      errors.phone = "Phone number is required";
      valid = false;
    }
    if (!country) {
      errors.country = "Country is required";
      valid = false;
    }
    if (!gender) {
      errors.gender = "Gender is required";
      valid = false;
    }
    if (!address) {
      errors.address = "Address is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your profile has been successfully updated.",
      });
      setVisible(!visible);
    } else {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill out all required fields correctly.",
      });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <BlurView
        intensity={50}
        style={styles.absolute}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      />
      <View style={styles.centeredView}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => setVisible(!visible)}>
            <Text style={styles.modalTitle}>Back</Text>
          </Pressable>
          <Text style={styles.modalTitle}>Edit profile</Text>
        </View>
        <MuzeInput label="Full name" value={fullName} onChangeText={setFullName} />
        <MuzeInput label="Username" value={username} onChangeText={setUsername} />
        <MuzeInput label="Email" value={email} onChangeText={setEmail} />
        <PhoneInput
          defaultValue={phone}
          defaultCode="EG"
          layout="first"
          onChangeFormattedText={(text) => {
            setPhone(text);
          }}
          containerStyle={{
            backgroundColor: "#1c2839",
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 24,
            width: "100%",
          }}
          textContainerStyle={{
            backgroundColor: "transparent",
            borderRightWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginLeft: -10,
          }}
          textInputStyle={{
            color: "#fff",
          }}
          codeTextStyle={{
            color: "#fff",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 30,
          }}
        >
          <MuzeDropdown
            label="Country"
            data={countries.map((item) => ({ key: item, value: item }))}
            setSelected={(value) => {
              setCountry(value);
            }}
          />
          <MuzeInput
            label="Gender"
            value={gender}
            onChangeText={setGender}
            style={{ width: "47%", minHeight: 75 }}
          />
        </View>
        <MuzeInput label="Address" value={address} onChangeText={setAddress} />
        <MuzeButton gradientStyle={{ width: width - 80 }} style={{}} onPress={handleSubmit}>
          Submit
        </MuzeButton>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
    padding: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
    backgroundColor: "#1c2839",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(218, 218, 218, 1)",
    marginTop: 16,
    marginLeft: 16,
  },
  input: {
    height: 35,
    marginHorizontal: 16,
    width: "100%",
    color: "#fff",
    fontSize: 18,
    paddingBottom: 8,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 135,
    marginBottom: 50,
  },
  dropDownContainer: {
    backgroundColor: "#1c2839",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    width: "47%",
    minHeight: 75,
  },
  dropDownLabel: {
    color: "#fff",
    fontSize: 15,
    marginTop: 8,
    marginLeft: 16,
  },
  dropdown: {
    color: "#fff",
    borderColor: "transparent",
    width: "100%",
    color: "#fff",
    fontSize: 18,
    paddingLeft: 20,
  },
});

export default EditProfile;
