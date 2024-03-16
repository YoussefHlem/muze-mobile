// React Native Libs
import React, { useState } from "react";

// Redux Libs
import { Provider } from "react-redux";
import store from "./store/store";

// Navigation Libs
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Utils
import { getAuthToken } from "./utils/AuthToken";
import { useEffect } from "react";

// Screens
import { Home, Explore, Collab, Booking, SignIn, SignUp } from "./screens";

// Main Navigators
const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeScreen" component={Home} />
  </Stack.Navigator>
);
const ExploreNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ExploreScreen" component={Explore} />
  </Stack.Navigator>
);
const CollabNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="CollabScreen" component={Collab} />
  </Stack.Navigator>
);
const BookingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="BookingScreen" component={Booking} />
  </Stack.Navigator>
);

export default function App() {
  // Get Authentication Token
  const [authToken, setAuthToken] = useState(null);
  const _getAuthToken = async () => {
    const AuthToken = await getAuthToken();
    setAuthToken(AuthToken);
  };
  useEffect(() => {
    _getAuthToken();
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <NavigationContainer>
          {authToken ? (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeNavigator} />
              <Tab.Screen name="Explore" component={ExploreNavigator} />
              <Tab.Screen name="Collab" component={CollabNavigator} />
              <Tab.Screen name="Booking" component={BookingNavigator} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name="Sign In" component={SignIn} />
              <Tab.Screen name="Sign Up" component={SignUp} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </Provider>
    </React.Fragment>
  );
}
