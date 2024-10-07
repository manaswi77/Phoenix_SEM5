import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";
import { RootState, AppDispatch } from "../store/store";
import { ScreenState } from "../types/types";
import SecurityIcon from "../../assets/SecurityIcon";
import ChatbotIcon from "../../assets/ChatbotIcon";
import HomeIcon from "../../assets/HomeIcon";
import CommunityIcon from "../../assets/CommunityIcon";
import SettingsIcon from "../../assets/SettingsIcon";

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
        style={
          currentScreen === "chatbot" ? styles.selectedButton : styles.navButton
        }
        onPress={() => handlePress("chatbot")}
      >
        <View>
          <ChatbotIcon
            // color={currentScreen === "chatbot" ? "#ffffff" : "#000000"}
            size={currentScreen === "chatbot" ? 32 : 26}
          />
        </View>
        <Text
          style={
            currentScreen === "chatbot" ? styles.selectedText : styles.navText
          }
        >
          Chatbot
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "security"
            ? styles.selectedButton
            : styles.navButton
        }
        onPress={() => handlePress("security")}
      >
        <View>
          <SecurityIcon
            // color={currentScreen === "security" ? "#ffffff" : "#000000"}
            size={currentScreen === "security" ? 32 : 26}
          />
        </View>
        <Text
          style={
            currentScreen === "security" ? styles.selectedText : styles.navText
          }
        >
          Security
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "info" ? styles.selectedButton : styles.navButton
        }
        onPress={() => handlePress("info")}
      >
        <View>
          <HomeIcon
            // color={currentScreen === "info" ? "#ffffff" : "#000000"}
            size={currentScreen === "info" ? 32 : 26}
          />
        </View>
        <Text
          style={
            currentScreen === "info" ? styles.selectedText : styles.navText
          }
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "community"
            ? styles.selectedButton
            : styles.navButton
        }
        onPress={() => handlePress("community")}
      >
        <View>
          <CommunityIcon
            // color={currentScreen === "community" ? "#ffffff" : "#000000"}
            size={currentScreen === "community" ? 32 : 26}
          />
        </View>
        <Text
          style={
            currentScreen === "community" ? styles.selectedText : styles.navText
          }
        >
          Community
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "settings"
            ? styles.selectedButton
            : styles.navButton
        }
        onPress={() => handlePress("settings")}
      >
        <View>
          <SettingsIcon
            // color={currentScreen === "settings" ? "#ffffff" : "#000000"}
            size={currentScreen === "settings" ? 32 : 26}
          />
        </View>
        <Text
          style={
            currentScreen === "settings" ? styles.selectedText : styles.navText
          }
        >
          Settings
        </Text>
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
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  navButton: {
    alignItems: "center",
    padding: 10,
    width: 85,
    height: 60,
  },
  selectedButton: {
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8e6fc",
    borderRadius: 15,
    width: 85,
    height: 60,
  },
  navText: {
    fontSize: 11,
    marginTop: 5,
    color: "#000000",
  },
  selectedText: { display: "none" },
});

export default BottomNavigation;
