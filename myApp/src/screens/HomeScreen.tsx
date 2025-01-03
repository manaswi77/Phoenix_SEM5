import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WelcomeScreen from "../components/Home_Screen_Components/WelcomeScreen";
import LoginScreen from "../components/Home_Screen_Components/LoginScreen";
import RegisterScreen from "../components/Home_Screen_Components/RegisterScreen";
import InfoScreen from "../components/Home_Screen_Components/InfoScreen";
import BottomNavigation from "../components/BottomNavigation";
import ChatbotScreen from "./ChatbotScreen";
import CommunityScreen from "./CommunityScreen";
import SettingsScreen from "./SettingsScreen";
import SecurityScreen from "./SecurityScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import { RootState } from "../store/store";
import OnboardingScreen from "../components/Splash_Screen_Components/OnboardingScreen";
import { AppDispatch } from "../store/store";
import { setIsLoggedIn, setCurrentScreen } from "../contexts/screenSlice";
import EmergencyScreen from "../components/Home_Screen_Components/EmergencyScreen";
import { auth } from "../config/firebase.config";
import { onAuthStateChanged, User } from "@firebase/auth";
import { getCurrentUserInfomation } from "../services/firebase/auth.services";
import * as SplashScreen from "expo-splash-screen";
import { setUser } from "../contexts/userSlice";
import { CurrentUser, UserSession } from "../types/types";
import {
  setSafetyTimerContacts,
  setSOSButtonContacts,
  updateSafetyTimerTimeInterval,
} from "../contexts/securityFeatureSlice";

SplashScreen.preventAutoHideAsync();

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isInitializing, setIsInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInformationLoading, setUserInformationLoading] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.screen.isLoggedIn);
  const isEmergency = useSelector(
    (state: RootState) => state.screen.isEmergency
  );
  const isChatbot = useSelector((state: RootState) => state.screen.isChatbot);
  const currentScreen = useSelector(
    (state: RootState) => state.screen.currentScreen
  );

  const [iseKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isInitializing && !userInformationLoading) {
      SplashScreen.hideAsync();
    }
  }, [isInitializing]);

  useEffect(() => {
    const getUserInfo = async (id: User["uid"]) => {
      const userInformation = await getCurrentUserInfomation(id);

      if (!currentUser) return;

      const CurrentUserInfo: CurrentUser = {
        uid: currentUser.uid,
        email: userInformation.email,
        name: userInformation.username,
        profilePhoto: userInformation.profilePhotoUrl,
        contactNumber: userInformation.contactNumber,
      };

      console.log(userInformation);

      console.log(userInformation.SOSButtonContacts);

      dispatch(setUser(CurrentUserInfo));
      dispatch(
        updateSafetyTimerTimeInterval(
          userInformation.SafetyTimerInterval || [0, 15]
        )
      );
      dispatch(
        setSOSButtonContacts(userInformation.SOSButtonContacts) || ["", "", ""]
      );
      dispatch(
        setSafetyTimerContacts(userInformation.SafetyTimerContacts) || [
          "",
          "",
          "",
        ]
      );
    };

    if (isInitializing) return;

    if (
      currentUser &&
      currentUser.emailVerified &&
      !isLoggedIn &&
      currentScreen !== "register" &&
      currentScreen !== "login"
    ) {
      setUserInformationLoading(true);

      getUserInfo(currentUser.uid);

      setUserInformationLoading(false);
      dispatch(setIsLoggedIn(true));
      dispatch(setCurrentScreen("info"));
    } else if (!currentUser && isLoggedIn) {
      dispatch(setIsLoggedIn(false));
      dispatch(setCurrentScreen("welcome"));
    }
  }, [currentUser, isInitializing]);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  if (isInitializing) {
    return null;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingScreen />;
      case "welcome":
        return <WelcomeScreen />;
      case "login":
        return <LoginScreen />;
      case "register":
        return <RegisterScreen />;
      case "info":
        return <InfoScreen />;
      case "chatbot":
        return <ChatbotScreen />;
      case "community":
        return <CommunityScreen />;
      case "settings":
        return <SettingsScreen />;
      case "security":
        return <SecurityScreen />;
      case "forgotPassword":
        return <ForgotPasswordScreen />;
      case "emergency":
        return <EmergencyScreen />;
      // default:
      //   return <Home />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      {renderScreen()}
      {isLoggedIn && !isEmergency && !iseKeyboardVisible && !isChatbot && (
        <BottomNavigation />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "#f8e6fc",
    // backgroundColor: "#fcf6f2",
    backgroundColor: "#f0eff4",
    paddingBottom: 5,
  },
});

export default HomeScreen;
