// React Native Libs
import React, { Suspense, useState } from "react";

// Redux Libs
import { Provider } from "react-redux";
import store from "./store/store";

// Navigation Libs
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Libs
import Toast from "react-native-toast-message";
import i18next from "./services/i18next";

// Utils
import { getAuthToken } from "./utils/AuthToken";
import { useEffect } from "react";

// Components
import Loading from "./components/common/Loading";

// Screens
import {
  Home,
  Explore,
  Collab,
  Booking,
  SignIn,
  SignUp,
  Profile,
} from "./screens";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // Get Authentication Token
  const [authToken, setAuthToken] = useState(null);
  const _getAuthToken = async () => {
    const AuthToken = await getAuthToken();
    setAuthToken(AuthToken);
  };
  useEffect(() => {
    _getAuthToken();
  }, [authToken]);

  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Sign In" component={SignIn} />
              <Stack.Screen name="Sign Up" component={SignUp} />
              <Stack.Screen name="Explore" component={Explore} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Collab" component={Collab} />
              <Stack.Screen name="Booking" component={Booking} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        <Toast />
      </Suspense>
    </React.Fragment>
  );
}
