import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useScreenContext } from "../contexts/HomeScreenContext";

const BottomNavigation: React.FC = () => {
  const { setCurrentScreen } = useScreenContext();

  return (
    <View style={styles.navContainer}>
      <Button title="Chatbot" onPress={() => setCurrentScreen("chatbot")} />
      <Button title="Security" onPress={() => setCurrentScreen("security")} />
      <Button title="Home" onPress={() => setCurrentScreen("info")} />
      <Button title="Community" onPress={() => setCurrentScreen("community")} />
      <Button title="Settings" onPress={() => setCurrentScreen("settings")} />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
});

export default BottomNavigation;
