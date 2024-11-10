import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";
import { RootState, AppDispatch } from "../store/store";
import { ScreenState } from "../types/types";
import SecurityIcon from "../../assets/SecurityIcon";
import ChatbotIcon from "../../assets/ChatbotIcon";
import HomeIcon from "../../assets/HomeIcon";
import CommunityIcon from "../../assets/CommunityIcon";
import SettingsIcon from "../../assets/SettingsIcon";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 5;

interface NavItem {
  id: ScreenState;
  icon: React.FC<{ size: number; color: string }>;
  label: string;
}

const navItems: NavItem[] = [
  {
    id: "chatbot",
    icon: ChatbotIcon as React.FC<{ size: number; color: string }>,
    label: "Chatbot",
  },
  {
    id: "security",
    icon: SecurityIcon as React.FC<{ size: number; color: string }>,
    label: "Security",
  },
  {
    id: "info",
    icon: HomeIcon as React.FC<{ size: number; color: string }>,
    label: "Home",
  },
  {
    id: "community",
    icon: CommunityIcon as React.FC<{ size: number; color: string; }>,
    label: "Community",
  },
  {
    id: "settings",
    icon: SettingsIcon as React.FC<{ size: number; color: string }>,
    label: "Settings",
  },
];

const BottomNavigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentScreen = useSelector(
    (state: RootState) => state.screen.currentScreen
  );
  const [topBarVisible, setTopBarVisible] = React.useState(false);

  const handlePress = (screen: ScreenState) => {
    dispatch(setCurrentScreen(screen));
    setTopBarVisible(true);
  };

  const getIconColor = (screenId: ScreenState) => {
    return currentScreen === screenId ? "#6A0DAD" : "#A9A9A9";
  };

  return (
    <>
      {/* {renderTopBar()} */}
      <View style={styles.navContainer}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navButton,
              currentScreen === item.id && styles.selectedButton,
            ]}
            onPress={() => handlePress(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <item.icon
                size={currentScreen === item.id ? 28 : 24}
                color={getIconColor(item.id)}
              />
            </View>
            <Text
              style={[
                styles.navText,
                currentScreen === item.id && styles.selectedText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX:
                    TAB_WIDTH *
                    navItems.findIndex((item) => item.id === currentScreen),
                },
              ],
            },
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#F5F2FA",
    borderTopWidth: 1,
    borderTopColor: "#D1C4E9",
    height: 60,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  selectedButton: {
    paddingTop: 10,
  },
  iconContainer: {
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    marginTop: 4,
    color: "#000000",
    textAlign: "center",
  },
  selectedText: {
    color: "#8E24AA",
    fontWeight: "500",
  },
  slider: {
    position: "absolute",
    top: 0,
    width: TAB_WIDTH * 0.6,
    height: 5,
    backgroundColor: "#8A2BE2",
    borderBottomLeftRadius: 5.5,
    borderBottomRightRadius: 5.5,
    left: TAB_WIDTH * 0.2,
  },
});

export default BottomNavigation;
