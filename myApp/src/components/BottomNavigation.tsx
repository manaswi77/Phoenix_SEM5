import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";
import { RootState, AppDispatch } from "../store/store";
import { ScreenState } from "../types/types";
import SecurityIcon from "../../assets/SecurityIcon";
import ChatbotIcon from "../../assets/ChatbotIcon";
import HomeIcon from "../../assets/HomeIcon";

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
        <View>
          <ChatbotIcon />
        </View>
        <Text style={styles.navText}>Chatbot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("security")}
      >
        <View>
          <SecurityIcon />
        </View>
        <Text style={styles.navText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("info")}
      >
        <View>
          <HomeIcon />
        </View>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("community")}
      >
        <View></View>
        <Text style={styles.navText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handlePress("settings")}
      >
        <View></View>
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
