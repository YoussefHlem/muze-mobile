import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const PaginationComp = ({ index, x, screenWidth }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = withSpring(
      interpolate(
        x.value,
        [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ],
        [5, 22, 5],
        Extrapolation.CLAMP,
      ),
    );

    const opacityAnimation = withSpring(
      interpolate(
        x.value,
        [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP,
      ),
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return (
    <Animated.View
      className="w-[5px] h-[5px] rounded-full bg-[#f77599] mx-1.5" // Reduced margin here
      style={animatedDotStyle}
    />
  );
};

export function Pagination({ data, screenWidth, x }) {
  return (
    <View className="h-10 flex-row items-center justify-center">
      {data.map((item, index) => (
        <PaginationComp
          key={item.id}
          index={index}
          x={x}
          screenWidth={screenWidth}
        />
      ))}
    </View>
  );
}
