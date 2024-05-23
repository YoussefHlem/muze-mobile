// Libraries
import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MuzeButton from "../common/MuzeButton";

const HireArtistModal = ({ show, onHide, setShowModal }) => {
  const navigation = useNavigation();

  const onHideHandler = () => {
    onHide();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={show} onRequestClose={onHideHandler}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Your Gig</Text>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.textContent}>
              <Text style={styles.subTitle}>
                Take your time in creating your Gig so it’s exactly as you want it to be.
              </Text>
              <Text>
                <Text style={styles.strong}>For Security Reasons:</Text>
              </Text>
              <View style={styles.ul}>
                <Text style={styles.li}>
                  • To keep our community secure for everyone, we may ask you to verify your ID.
                </Text>
                <Text style={styles.li}>
                  • Providing any misleading or inaccurate information about your identity may lead
                  to your account banning.
                </Text>
                <Text style={styles.li}>
                  • Remember, you can always create more Gigs from the same account.
                </Text>
                <Text style={styles.li}>
                  • Requesting to take communication and payment outside of Muze will lead to
                  account banning.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <MuzeButton onPress={() => navigation.navigate("CreateGig")}>
              Proceed To Create Gig Page
            </MuzeButton>
            <MuzeButton onPress={onHideHandler}>Close</MuzeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#171717",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "85%",
  },
  modalHeader: {
    width: "100%",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  modalBody: {
    width: "100%",
  },
  textContent: {
    color: "#fff",
    padding: 10,
  },
  subTitle: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
    color: "#fff",
  },
  strong: {
    fontWeight: "bold",
    color: "#fff",
  },
  ul: {
    marginLeft: 20,
    marginTop: 15,
  },
  li: {
    color: "#fff",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
  },
});

export default HireArtistModal;
