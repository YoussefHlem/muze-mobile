// React Native Libs
import React, { Suspense } from "react";

// Redux Libs
import { Provider } from "react-redux";
import store from "./store/store";

// Navigation Libs
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// Libs
import Toast from "react-native-toast-message";
import i18next from "./services/i18next";

// Utils

// Components
import Loading from "./components/common/Loading";
import { StatusBar } from "expo-status-bar";

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

export default function App() {
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
              <Stack.Screen name="Explore" component={Explore} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Collab" component={Collab} />
              <Stack.Screen name="Booking" component={Booking} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Sign In" component={SignIn} />
              <Stack.Screen name="Sign Up" component={SignUp} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        <Toast />
      </Suspense>
    </React.Fragment>
  );
}
