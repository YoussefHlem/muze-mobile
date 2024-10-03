// Libs
import {useState} from "react";
import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Ionicons} from "@expo/vector-icons";

// Components
import BoxContainer from "../../components/Auth/BoxContainer";
import MuzeInput from "../../components/common/MuzeInput";
import MuzeButton from "../../components/common/MuzeButton";
import LineWrapper from "../../components/Auth/LineWrapper";
import ForgetPasswordModal from "../../components/Auth/ForgetPasswordModal";

// Apis
import {signin} from "../../apis/user";

// Redux
import Toast from "react-native-toast-message";
import {setItemAsync} from "expo-secure-store";
import {reloadAsync} from "expo-updates";

// Assets
const signinBackground = require("../../assets/Images/signin/signin-background.jpg");
const googleLogo = require("../../assets/Images/common/Google-Logo.png");
const facebookLogo = require("../../assets/Images/common/FB-Logo.png");

const SignIn = ({navigation}) => {
	const {t} = useTranslation();
	const [showModal, setShowModal] = useState(false); // State to handle the modal visibility

	return (
		<View style={styles.container}>
			<ImageBackground source={signinBackground} style={styles.container}>
				<View style={styles.wrapper}>
					<BoxContainer>
						<View style={styles.innerContainer}>
							<SignInText navigation={navigation} t={t}/>
							<SignInForm t={t} onForgetPassword={() => setShowModal(true)}/>
						</View>
					</BoxContainer>
				</View>
			</ImageBackground>
			<ForgetPasswordModal visible={showModal} onClose={() => setShowModal(false)}/>
		</View>
	);
};

// Mini Components
const SignInText = ({navigation, t}) => {
	return (
		<>
			<Text style={styles.title}>{t("welcomeBack")}</Text>
			<View style={styles.anchorContainer}>
				<Text style={styles.subTitle}>{t("dontHaveAnAccount?")}</Text>
				<Pressable onPress={() => navigation.navigate("Sign Up")}>
					<Text style={styles.anchor}>{t("signUp")}</Text>
				</Pressable>
			</View>
		</>
	);
};

const SignInForm = ({t, onForgetPassword}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(false);
	const [formData, setFormData] = useState({
		email: "momo222222@momo.com",
		password: "helloworld11",
	});

	const handleChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
		setError(false);
	};

	const handleSubmit = () => {
		signin(formData)
			.then(async (res) => {
				if (!res.data.Error) {
					setError(false);
					Toast.show({
						type: "success",
						text1: "Login Successful 👋",
					});
					console.log(res.data);
					await setItemAsync("accessToken", res.data.accessToken);
					await setItemAsync("refreshToken", res.data.refreshToken);
					await setItemAsync("FormData", JSON.stringify(formData));
					await reloadAsync();
				} else {
					setError(true);
					Toast.show({
						type: "error",
						text1: res.data.Error,
					});
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<View>
			<MuzeInput
				type="email"
				placeholder={t("email")}
				value={formData.email}
				onChange={(text) => handleChange("email", text)}
				isDark={true}
				required={true}
				style={{
					borderColor: error ? "#ff0000" : "#fff",
				}}
			/>
			<View style={styles.passwordContainer}>
				<MuzeInput
					type={showPassword ? "text" : "password"}
					id="password"
					placeholder={t("password")}
					value={formData.password}
					onChange={(text) => handleChange("password", text)}
					isDark={true}
					style={{
						borderColor: error ? "#ff0000" : "#fff",
					}}
				/>
				<Pressable style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
					<Ionicons name="eye" size={24} color="black"/>
				</Pressable>
			</View>
			<View>
				<Pressable onPress={onForgetPassword}>
					{/* Use the passed function to show modal */}
					<Text style={styles.anchor}>Did You Forget Password?</Text>
				</Pressable>
			</View>
			<MuzeButton onPress={handleSubmit}> {t("signIn")}</MuzeButton>
			<LineWrapper>
				<Text style={{color: "#fff", fontWeight: "600"}}>{t("orSigninWith")}</Text>
			</LineWrapper>
			<View style={styles.iconsContainer}>
				<Pressable style={styles.iconWrapper}>
					<Image source={googleLogo}/>
				</Pressable>
				<Pressable style={styles.iconWrapper}>
					<Image source={facebookLogo}/>
				</Pressable>
			</View>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		alignItems: "center",
	},
	innerContainer: {
		padding: 20,
		paddingHorizontal: 40,
	},
	title: {
		fontWeight: "700",
		lineHeight: 66,
		textAlign: "center",
		color: "#ffffff",
		fontSize: 28,
	},
	anchorContainer: {
		flexDirection: "row",
		justifyContent: "left",
		width: "100%",
		fontWeight: "500",
		fontSize: 15,
		lineHeight: 20,
		marginBottom: 20,
		gap: 10,
	},
	subTitle: {
		alignSelf: "center",
		color: "#fff",
		fontWeight: "600",
	},
	anchor: {
		color: "#1d69a7",
		textDecorationLine: "underline",
		marginLeft: "0.5%",
		fontWeight: "600",
	},
	passwordContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		position: "absolute",
		right: 0,
		zIndex: 10,
	},
	iconsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	iconWrapper: {
		marginHorizontal: 10,
		backgroundColor: "#fff",
		width: 45,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
});
