import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Icon} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import SearchModal from "./SearchModal";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/services/userSlice";

const NavBarLogo = () => {
	const {user} = useSelector(selectUser)
	return (
		<View>
			<Text style={styles.userName}>Hello, {user?.firstName} {user?.lastName}!</Text>
		</View>
	);
};

const IconsContainer = ({setModalVisible, navigate}) => {
	return (
		<View style={styles.iconsContainer}>
			<Pressable onPress={() => setModalVisible(true)}>
				<Icon name="search" type="font-awesome" color="#CBCBCB"/>
			</Pressable>
			<Icon name="bell" type="font-awesome" color="#CBCBCB"/>
			<Pressable onPress={() => navigate("Messaging")}>
				<Icon name="envelope" type="font-awesome" color="#CBCBCB"/>
			</Pressable>
		</View>
	);
};

const TheNavbar = () => {
	const {navigate} = useNavigation();
	const [isModalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.container}>
			<NavBarLogo/>
			<IconsContainer setModalVisible={setModalVisible} navigate={navigate}/>
			<SearchModal visible={isModalVisible} setVisible={setModalVisible}/>
		</View>
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
		marginTop: 35,
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
		fontWeight: 'bold',
		color: "#fff",
	},
});