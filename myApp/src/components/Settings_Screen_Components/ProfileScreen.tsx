import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Information" | "Saved Posts">(
    "Information"
  );

  const user = useSelector((state: RootState) => state.appUser.user);
  const [username, setUsername] = useState<string | undefined>(user?.name);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    user?.profilePhoto
  );

  const handleForgot = () => {

  }

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setProfilePicture(user.profilePhoto);
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.homeButton}>
          <Feather name="home" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  profilePicture ||
                  "https://v0.dev/placeholder.svg?height=150&width=150",
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>{username || "User"}</Text>
        </View>
        <View style={styles.tabContainer}>
          {["Information", "Saved Posts"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as typeof activeTab)}
            >
              <Feather
                name={tab === "Information" ? "user" : "bookmark"}
                size={20}
                color={activeTab === tab ? "#6200ee" : "#757575"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {activeTab === "Information" && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <AntDesign name="contacts" size={24} color="black" />
              <Text style={styles.menuItemText}>Edit Contact Number</Text>
              <Feather
                name="chevron-right"
                size={24}
                color="#333"
                style={styles.chevron}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleForgot}>
              <MaterialIcons name="password" size={24} color="black" />
              <Text style={styles.menuItemText}>Change Password</Text>
              <Feather
                name="chevron-right"
                size={24}
                color="#333"
                style={styles.chevron}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Feather name="help-circle" size={24} color="black" />
              <Text style={styles.menuItemText}>Help</Text>
              <Feather
                name="chevron-right"
                size={24}
                color="#333"
                style={styles.chevron}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <AntDesign name="logout" size={24} color="black" />
              <Text style={styles.menuItemText}>Log Out</Text>
              <Feather
                name="chevron-right"
                size={24}
                color="#333"
                style={styles.chevron}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  homeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  profileCard: {
    backgroundColor: "#E9DEF9",
    borderRadius: 20,
    marginTop: 60,
    marginHorizontal: 20,
    padding: 20,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,
    // paddingBottom: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6200ee",
  },
  tabText: {
    marginLeft: 5,
    color: "#757575",
  },
  activeTabText: {
    color: "#6200ee",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  chevron: {
    marginLeft: 10,
  },
});

export default ProfileScreen;
