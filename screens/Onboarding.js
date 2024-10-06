import { Text, useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { data } from "../components/Onboarding/data";
import { Button } from "../components/Onboarding/Button";
import { Pagination } from "../components/Onboarding/Pagination";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";

const RenderItem = ({ item, index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View className="flex-1" style={{ width: SCREEN_WIDTH }}>
      <View className="relative w-full h-1/2 mb-32">
        {/* Updated background circle color */}
        <View className="absolute w-[550px] h-[550px] bg-[#1E1E1E] rounded-full -top-[82px] -left-[70px]" />
        <Animated.Image
          source={item.image}
          className="absolute w-[550px] h-[550px] rounded-full -top-[100px] -left-[70px]"
          style={imageAnimatedStyle}
        />
      </View>

      <Animated.View style={textAnimatedStyle} className="p-6">
        {/* Updated text colors */}
        <Text className="text-[26px] w-[85%] font-bold text-[#FFFFFF] mb-7">
          {item.title}
        </Text>
        <Text className="text-[20px] w-[85%] leading-7 text-[#CCCCCC]">
          {item.text}
        </Text>
      </Animated.View>
    </View>
  );
};

export default function Onboarding() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const { navigate } = useNavigation();
  (async () => {
    const token = await getItemAsync("accessToken");
    if (token) navigate("Home");
    else navigate("Auth");
    return token;
  })();

  return (
    <View className="flex-1 bg-[#121212]">
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* Dark themed button container */}
      <View className="flex-row items-center justify-between mx-5 my-5">
        <Pagination data={data} screenWidth={SCREEN_WIDTH} x={x} />
        <Button
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </View>
  );
}
