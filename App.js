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
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

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
  Users,
  VideoScreen,
  SearchList,
} from "./screens";
import HireArtist from "./screens/HireArtist";
import GigDetails from "./screens/HireArtist/GigDetails";
import CreateGig from "./components/HireArtist/CreateGig";
import CollabOnMusicians from "./screens/CollabOnMusicians";
import CollabOnGeners from "./screens/CollabOnGeners";

TimeAgo.addDefaultLocale(en);

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
              {/* Main Screens */}
              <Stack.Screen name="HireArtist" component={HireArtist} />
              <Stack.Screen name="Explore" component={Explore} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Collab" component={Collab} />
              <Stack.Screen name="Booking" component={Booking} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Users" component={Users} />

              {/* Nested Screens */}
              <Stack.Screen name="Video" component={VideoScreen} />
              <Stack.Screen name="SearchList" component={SearchList} />
              <Stack.Screen name="GigDetail" component={GigDetails} />
              <Stack.Screen name="CreateGig" component={CreateGig} />
              <Stack.Screen name="CollabOnMusicans" component={CollabOnMusicians} />
              <Stack.Screen name="CollabOnGeners" component={CollabOnGeners} />

              {/* Authentication Screen */}
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
