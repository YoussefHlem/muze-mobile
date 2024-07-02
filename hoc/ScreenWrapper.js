import React from "react";
import { ImageBackground, View } from "react-native";
import { TheNavbar, TheFooter } from "../components";
const ScreenWrapper = (WrappedComponent) => {
  const HOC = () => {
    return (
      <React.Fragment>
        <View
          style={{
            flex: 1,
            backgroundColor: "#171717",
          }}
        >
          <ImageBackground
            source={require("../assets/Images/background-dark-img.png")}
            style={{ flex: 1 }}
            imageStyle={{ resizeMode: "cover" }}
          >
            <TheNavbar />

            <WrappedComponent />

            <TheFooter />
          </ImageBackground>
        </View>
      </React.Fragment>
    );
  };

  return HOC;
};

export default ScreenWrapper;
