import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";
import { RootState, AppDispatch } from "../store/store";
import { ScreenState } from "../types/types";

const BottomNavigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentScreen = useSelector(
    (state: RootState) => state.screen.currentScreen
  );

  const handlePress = (screen: ScreenState) => {
    dispatch(setCurrentScreen(screen));
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("chatbot")}
      >
        <Text style={styles.navText}>Chatbot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("security")}
      >
        <Text style={styles.navText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("info")}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("community")}
      >
        <Text style={styles.navText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("settings")}
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
  navigationIcon: {
    height: 30,
    width: 30,
    borderWidth: 1,
    backgroundColor: "red",
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
