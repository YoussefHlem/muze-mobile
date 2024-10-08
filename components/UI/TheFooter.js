// Libs
import React, {useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";

// Components
import {Image, ImageBackground, Pressable, StyleSheet, View} from "react-native";
import {getAuthToken} from "../../utils/AuthToken";

// Redux
import {useSelector} from "react-redux";
import {selectUser} from "../../store/services/userSlice";
import {PostModal} from "../index";

const TheFooter = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const {user} = useSelector(selectUser);
	const [authToken, setAuthToken] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		(async () => {
			const auth = await getAuthToken();
			setAuthToken(auth);
		})();
	}, []);

	return (
		<>
			{authToken ? (
				<>
					{/* Post Modal */}
					<PostModal show={showModal} onHide={() => setShowModal(false)} setShowModal={setShowModal}/>

					<ImageBackground
						style={styles.footerContainer}
						source={require("../../assets/Images/footer-background.png")}
					>
						<Pressable onPress={() => navigation.navigate("Home")}>
							<View style={[styles.screenButton, route.name === "Home" && styles.activeScreen]}>
								<Image source={require("../../assets/Images/side-menu/dark-home.png")}/>
							</View>
						</Pressable>
						<Pressable onPress={() => navigation.navigate("Explore")}>
							<View style={[styles.screenButton, route.name === "Explore" && styles.activeScreen]}>
								<Image source={require("../../assets/Images/side-menu/dark-explore.png")}/>
							</View>
						</Pressable>
						<Pressable onPress={() => setShowModal(true)}>
							<View style={[styles.screenButton, route.name === "AddNew" && styles.activeScreen]}>
								<Image
									style={{width: 30, height: 30}}
									source={require("../../assets/Images/side-menu/plus-icon.png")}
								/>
							</View>
						</Pressable>
						<Pressable onPress={() => navigation.navigate("Collab")}>
							<View style={[styles.screenButton, route.name === "Collab" && styles.activeScreen]}>
								<Image source={require("../../assets/Images/side-menu/dark-collab.png")}/>
							</View>
						</Pressable>
						<Pressable onPress={() => navigation.navigate("Booking")}>
							<View style={[styles.screenButton, route.name === "Booking" && styles.activeScreen]}>
								<Image source={require("../../assets/Images/side-menu/dark-booking.png")}/>
							</View>
						</Pressable>
					</ImageBackground>

					{/* Profile Image */}
					<View style={styles.profileImage}>
						<Pressable onPress={() => navigation.navigate("Profile")}>
							<View
								style={[styles.innerImageContainer, route.name === "Profile" && styles.activeScreen]}
							>
								<Image
									source={{
										uri: user.userImage.blobUrl
											? user.userImage.blobUrl
											: "https://muzefirststorage.blob.core.windows.net/usercontainer/img/img-1687160459492",
									}}
									style={styles.innerImage}
								/>
							</View>
						</Pressable>
					</View>
				</>
			) : (
				<>
					<ImageBackground
						style={styles.footerContainer}
						source={require("../../assets/Images/footer-background.png")}
					>
						<Pressable onPress={() => navigation.navigate("Sign In")}>
							<View style={[styles.screenButton, route.name === "Sign In" && styles.activeScreen]}>
								<Image source={require("../../assets/Images/side-menu/dark-home.png")}/>
							</View>
						</Pressable>
						<Pressable onPress={() => navigation.navigate("Sign Up")}>
							<View style={[styles.screenButton, route.name === "Sign Up" && styles.activeScreen]}>
								<Image source={require("../../assets/Images/side-menu/dark-explore.png")}/>
							</View>
						</Pressable>
					</ImageBackground>
				</>
			)}
		</>
	);
};

export default TheFooter;

const styles = StyleSheet.create({
	footerContainer: {
		position: "absolute",
		bottom: 0,
		zIndex: 99,
		width: "100%",
		height: 80,
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "rgba(255, 255, 255, 0.4)",
		borderTopLeftRadius: 22,
		borderTopRightRadius: 23,
		overflow: "hidden",
	},
	screenButton: {
		padding: 15,
		borderTopLeftRadius: 22,
		borderTopRightRadius: 23,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		gap: 12,
	},
	activeScreen: {
		backgroundColor: "#1D7EEC",
		borderWidth: 2,
		borderColor: "#4B90E0",
	},
	profileImage: {
		position: "absolute",
		zIndex: 100,
		bottom: 50,
		width: "100%",
		alignItems: "center",
	},
	innerImageContainer: {
		borderColor: "#FFFFFF26",
		borderWidth: 2,
		borderRadius: 50,
		padding: 5,
	},
	innerImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		padding: 10,
		borderColor: "#000",
		borderWidth: 5,
	},
});
