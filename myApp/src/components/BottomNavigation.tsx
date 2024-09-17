import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useScreenContext } from "../contexts/HomeScreenContext";

const BottomNavigation: React.FC = () => {
  const { setCurrentScreen } = useScreenContext();

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentScreen("chatbot")}
      >
        <Text style={styles.navText}>Chatbot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentScreen("security")}
      >
        <Text style={styles.navText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentScreen("info")}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentScreen("community")}
      >
        <Text style={styles.navText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setCurrentScreen("settings")}
      >
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  navButton: {
    alignItems: "center",
    padding: 10,
  },
  navIcon: {
    width: 25,
    height: 25,
    borderWidth: 4,
  },
  navText: {
    marginTop: 5,
    color: "#000",
  },
});

export default BottomNavigation;
