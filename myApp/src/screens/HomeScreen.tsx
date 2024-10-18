import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
import { AppDispatch } from "../store/store";
import { setIsLoggedIn, setCurrentScreen } from "../contexts/screenSlice";
import { checkUserSession as checkUserSessionService } from "../services/database/UserSession.services";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector((state: RootState) => state.screen.isLoggedIn);
  const currentScreen = useSelector(
    (state: RootState) => state.screen.currentScreen
  );

  useEffect(() => {
    const fetchUserSession = async () => {
      const isLoggedIn = await checkUserSessionService();
      if (isLoggedIn) {
        dispatch(setIsLoggedIn(true));
        dispatch(setCurrentScreen("info"));
      }
    };

    fetchUserSession();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
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
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      {renderScreen()}
      {isLoggedIn && <BottomNavigation />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "#f8e6fc", 
    // backgroundColor: "#fcf6f2",
    backgroundColor: "#f0eff4",
    paddingTop: 30,
    paddingBottom: 5,
  },
});

export default HomeScreen;
