// Libs
import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

// Apis
import {myPosts} from "../../../apis/post";

// Components
import PostCard from "../../../components/common/PostCard";
import {useDispatch} from "react-redux";
import {setVideoData} from "../../../store/services/videoSlice";
import {useTranslation} from "react-i18next";

// Assets
const Portfolio = () => {
	const [Posts, setPosts] = useState([]);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {t} = useTranslation();

	useEffect(() => {
		myPosts().then((res) => {
			setPosts(res.data.posts);
		});
	}, []);
	const videoNavigationHandler = (video) => {
		dispatch(setVideoData(video));
		navigation.navigate("Video");
	};

	return (
		<ScrollView contentContainerStyle={{flex: 1}}>
			<View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
				{Posts?.length ? (
					Posts?.map((post, index) => (
						<Pressable onPress={() => videoNavigationHandler(post)} key={index} style={{marginBottom: 20}}>
							<PostCard
								key={index}
								cover={post.postCoverUrl}
								isProfile={true}
								date={post.createdOn}
								isMinified={true}
							/>
						</Pressable>
					))
				) : (
					<Text>{t("No Posts yet")}</Text>
				)}
			</View>
		</ScrollView>
	);
};

export default Portfolio;
