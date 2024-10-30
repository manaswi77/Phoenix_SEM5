import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MenuItem {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
}

const menuItems: MenuItem[] = [
  { icon: 'edit', title: 'Edit Profile' },
  { icon: 'bar-chart-2', title: 'Chart and Report' },
  { icon: 'calendar', title: 'Set Calender' },
  { icon: 'key', title: 'Access Code' },
  { icon: 'bell', title: 'Reminder' },
  { icon: 'help-circle', title: 'Help' },
];

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Information' | 'Your Posts' | 'Saved Posts'>('Information');

  const renderMenuItem = ({ icon, title }: MenuItem) => (
    <TouchableOpacity key={title} style={styles.menuItem}>
      <Feather name={icon} size={24} color="#333" />
      <Text style={styles.menuItemText}>{title}</Text>
      <Feather name="chevron-right" size={24} color="#333" style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.homeButton}>
          <Feather name="home" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://v0.dev/placeholder.svg?height=150&width=150' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>Manaswi</Text>
        </View>
        <View style={styles.tabContainer}>
          {['Information', 'Your Posts', 'Saved Posts'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as typeof activeTab)}
            >
              <Feather name={tab === 'Information' ? 'user' : tab === 'Your Posts' ? 'file-text' : 'bookmark'} size={20} color={activeTab === tab ? '#6200ee' : '#757575'} />
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {activeTab === 'Information' && (
          <View style={styles.menuContainer}>
            {menuItems.map(renderMenuItem)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  profileCard: {
    backgroundColor: '#E9DEF9',
    borderRadius: 20,
    marginTop: 60,
    marginHorizontal: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,
    // paddingBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
  },
  tabText: {
    marginLeft: 5,
    color: '#757575',
  },
  activeTabText: {
    color: '#6200ee',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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