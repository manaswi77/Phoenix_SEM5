import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import FeaturesScreen from "../components/Security_Screen_Components/FeaturesScreen";
import SOSButtonScreen from "../components/Security_Screen_Components/SOSButtonScreen";
import SecurityTimerScreen from "../components/Security_Screen_Components/SecurityTimerScreen";
import IncidentReportingScreen from "../components/Security_Screen_Components/IncidentReportingScreen";
import { RootState } from "../store/store";

const SecurityScreen: React.FC = () => {
  const currentScreen = useSelector(
    (state: RootState) => state.security.currentFeature
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case "sosBtn":
        return <SOSButtonScreen />;
      case "incidentReporting":
        return <IncidentReportingScreen />;
      case "safetyTimer":
        return <SecurityTimerScreen />;
      case "features":
        return <FeaturesScreen />;
    }
  };

  return <View>{renderScreen()}</View>;
};

export default SecurityScreen;
