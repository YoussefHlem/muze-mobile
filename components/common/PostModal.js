// Libs
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

// Components
import { Modal, StyleSheet, View, Text, Pressable, Image } from "react-native";
import MuzeButton from "./MuzeButton";

const PostModal = ({ show, onHide, setShowModal }) => {
  const [file, setFile] = useState({ src: "" });
  const [cover, setCover] = useState({ src: "" });

  const onHideHandler = () => {
    onHide();
  };

  const handleUpload = async (type) => {
    let mediaType =
      type === "video"
        ? ImagePicker.MediaTypeOptions.Videos
        : ImagePicker.MediaTypeOptions.Images;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType,
      quality: 1,
    });

    if (!result.cancelled) {
      if (type === "video") {
        setFile({ src: result.assets[0].uri });
      } else {
        setCover({ src: result.assets[0].uri });
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={onHideHandler}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Post</Text>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.modalUploading}>
              <View style={styles.uploadUnit}>
                <Text>
                  <Pressable onPress={() => handleUpload("video")}>
                    {file.src ? (
                      <Image source={{ uri: file.src }} />
                    ) : (
                      <Text style={{ color: "#fff" }}>Upload a video</Text>
                    )}
                  </Pressable>
                </Text>
              </View>
              <View style={styles.uploadUnit}>
                <Text>
                  <Pressable onPress={() => handleUpload("cover")}>
                    {cover.src ? (
                      <Image source={{ uri: cover.src }} />
                    ) : (
                      <Text style={{ color: "#fff" }}>upload a cover</Text>
                    )}
                  </Pressable>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <MuzeButton onPress={onHideHandler}>Close</MuzeButton>
            <MuzeButton>Upload</MuzeButton>
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
  modalUploading: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  uploadUnit: {
    width: "47%",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 150,
    borderRadius: 5,
  },
});

export default PostModal;
