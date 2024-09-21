import React from "react";
import { View, StyleSheet } from "react-native";
import WelcomeScreen from "../components/Home_Screen_Components/WelcomeScreen";
import LoginScreen from "../components/Home_Screen_Components/LoginScreen";
import RegisterScreen from "../components/Home_Screen_Components/RegisterScreen";
import InfoScreen from "../components/Home_Screen_Components/InfoScreen";
import BottomNavigation from "../components/BottomNavigation";
import ChatbotScreen from "./ChatbotScreen";
import CommunityScreen from "./CommunityScreen";
import SettingsScreen from "./SettingsScreen";
import SecurityScreen from "./SecurityScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const HomeScreen: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.screen.isLoggedIn);
  const currentScreen = useSelector(
    (state: RootState) => state.screen.currentScreen
  );

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
    backgroundColor: "#f8e6fc",
    paddingTop: 30,
    paddingBottom: 5,
  },
});

export default HomeScreen;
