import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { createGig } from "../../apis/gigs";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import MuzeButton from "../common/MuzeButton";

const CreateGig = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    coverImage: null,
    uploadImages: [],
    description: "",
    serviceTitle: "",
    shortDescription: "",
    deliveryTime: "",
    revisionNumber: "",
    features: [],
    price: "",
  });

  const handleChange = (name, value) => {
    if (name === "features") {
      const featuresArray = value.split(" ").filter((feature) => feature.trim() !== "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        features: featuresArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const createGigHandler = () => {
    console.log(formData);
    createGig(formData).then(() => {
      //
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Gig</Text>
      <View style={styles.sections}>
        <View style={styles.info}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. I will do something good "
            placeholderTextColor="#cccccc"
            value={formData.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={formData.category}
            style={styles.input}
            onValueChange={(itemValue) => handleChange("category", itemValue)}
          >
            <Picker.Item label="Music" value="music" />
            <Picker.Item label="Music Bardo" value="musicBardo" />
            <Picker.Item label="Music Also" value="musicAlso" />
            <Picker.Item label="Different Music" value="differentMusic" />
          </Picker>

          <Text style={styles.label}>Cover Image</Text>
          {/* Implement it after fixing uploading azure issue */}

          <Text style={styles.label}>Upload Images</Text>
          {/* Implement it after fixing uploading azure issue */}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Brief descriptions to introduce your service to customers"
            placeholderTextColor="#cccccc"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline={true}
            numberOfLines={16}
          />
          <MuzeButton onPress={createGigHandler}>Create</MuzeButton>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Service Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. One-page web design"
            placeholderTextColor="#cccccc"
            value={formData.serviceTitle}
            onChangeText={(text) => handleChange("serviceTitle", text)}
          />
          <Text style={styles.label}>Short Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Short description of your service"
            placeholderTextColor="#cccccc"
            value={formData.shortDescription}
            onChangeText={(text) => handleChange("shortDescription", text)}
            multiline={true}
            numberOfLines={10}
          />
          <Text style={styles.label}>Delivery Time (e.g. 3 days)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 3"
            placeholderTextColor="#cccccc"
            value={formData.deliveryTime}
            onChangeText={(text) => handleChange("deliveryTime", text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Revision Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2"
            placeholderTextColor="#cccccc"
            value={formData.revisionNumber}
            onChangeText={(text) => handleChange("revisionNumber", text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Add Features</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. page design"
            placeholderTextColor="#cccccc"
            onChangeText={(text) => handleChange("features", text)}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 100"
            placeholderTextColor="#cccccc"
            value={formData.price}
            onChangeText={(text) => handleChange("price", text)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "300",
    textAlign: "center",
    marginVertical: 20,
    color: "#ffffff", // Light text color
  },
  sections: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 18,
    color: "#cccccc", // Light text color
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderColor: "#555", // Light border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    color: "#ffffff", // Light text color
    backgroundColor: "#444", // Dark input background
  },
  textarea: {
    height: 100,
  },
  button: {
    backgroundColor: "#1dbf73",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ScreenWrapper(CreateGig);
