import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ dataLength, flatListIndex, flatListRef }) {
  const { navigate } = useNavigation();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastScreen ? withTiming(60) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
      return;
    }
    navigate("Auth");
  };

  return (
    <LinearGradient
      colors={["#016299", "#f77599"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: 24,
        alignItems: "center",
      }}
    >
      <AnimatedPressable
        onPress={handleNextScreen}
        className="rounded-[24px] items-center justify-center overflow-hidden"
        style={buttonAnimationStyle}
      >
        <Animated.Text
          className="absolute text-white font-bold text-lg"
          style={textAnimationStyle}
        >
          Get Started
        </Animated.Text>

        <Animated.View className="absolute" style={arrowAnimationStyle}>
          <Feather name="arrow-right" size={30} color="white" />
        </Animated.View>
      </AnimatedPressable>
    </LinearGradient>
  );
}
