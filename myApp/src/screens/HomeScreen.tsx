import React from "react";
import { View, StyleSheet } from "react-native";
import WelcomeScreen from "../components/Home_Screen_Components/WelcomeScreen";
import LoginScreen from "../components/Home_Screen_Components/LoginScreen";
import RegisterScreen from "../components/Home_Screen_Components/RegisterScreen";
import InfoScreen from "../components/Home_Screen_Components/InfoScreen";
import BottomNavigation from "../components/BottomNavigation";
import { useScreenContext } from "../contexts/HomeScreenContext";
import ChatbotScreen from "./ChatbotScreen";
import CommunityScreen from "./CommunityScreen";
import SettingsScreen from "./SettingsScreen";
import SecurityScreen from "./SecurityScreen";

const HomeScreen: React.FC = () => {
  const { isLoggedIn, currentScreen } = useScreenContext();

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
    <View style={styles.container}>
      {renderScreen()}
      {isLoggedIn && <BottomNavigation />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
