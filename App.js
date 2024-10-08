// App.js
import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import store from "./store/store";
import Toast from "react-native-toast-message";
import Loading from "./components/common/Loading";
import { StatusBar } from "expo-status-bar";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

// Screens
import {
  Booking,
  Collab,
  Explore,
  Home,
  Profile,
  SearchList,
  SignIn,
  SignUp,
  Users,
  VideoScreen,
} from "./screens";
import HireArtist from "./screens/HireArtist";
import GigDetails from "./screens/HireArtist/GigDetails";
import CreateGig from "./components/HireArtist/CreateGig";
import CollabOnMusicians from "./screens/CollabOnMusicians";
import CollabOnGeners from "./screens/CollabOnGeners";
import CollaborationDetails from "./screens/CollaborationDetails";
import ForgetPassword from "./screens/ForgetPassword";
import Settings from "./screens/Settings";
import ChatsScreen from "./screens/messaging";
import Chat from "./screens/messaging/Chat";
import Auth from "./screens/New_Auth";
import HelpSupport from "./screens/Settings/screens/HelpSupport";
import PrivacyPolicy from "./screens/Settings/screens/PrivacyPolicy";
import Onboarding from "./screens/Onboarding";

TimeAgo.addDefaultLocale(en);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <GestureHandlerRootView>
            <ThemedApp />
          </GestureHandlerRootView>
        </ThemeProvider>
      </ReduxProvider>
      <Toast />
    </Suspense>
  );
};

const ThemedApp = () => {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <ThemeProvider theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Main Screens */}
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Messaging" component={ChatsScreen} />
          <Stack.Screen name="Conversation" component={Chat} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Collab" component={Collab} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="HireArtist" component={HireArtist} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="HelpSupport" component={HelpSupport} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

          {/* Nested Screens */}
          <Stack.Screen name="Video" component={VideoScreen} />
          <Stack.Screen name="SearchList" component={SearchList} />
          <Stack.Screen name="GigDetail" component={GigDetails} />
          <Stack.Screen name="CreateGig" component={CreateGig} />
          <Stack.Screen name="CollabOnMusicans" component={CollabOnMusicians} />
          <Stack.Screen name="CollabOnGeners" component={CollabOnGeners} />
          <Stack.Screen
            name="CollaborationDetails"
            component={CollaborationDetails}
          />

          {/* Authentication Screen */}
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
