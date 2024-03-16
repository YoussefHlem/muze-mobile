import React from "react";
import { TheNavbar, TheFooter } from "../components";
const ScreenWrapper = (WrappedComponent) => {
  const HOC = () => {
    return (
      <React.Fragment>
        <TheNavbar />

        <WrappedComponent />

        <TheFooter />
      </React.Fragment>
    );
  };

  return HOC;
};

export default ScreenWrapper;
