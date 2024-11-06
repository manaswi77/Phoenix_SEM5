import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../contexts/screenSlice";
import { AppDispatch } from "../../store/store";
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ArticleData {
  title: string;
  imageUrl: string;
}

const articleData: ArticleData[] = [
  {
    title: 'Daily Woman',
    imageUrl: 'https://res.cloudinary.com/desa0upux/image/upload/v1729229039/la9fafqkxypajto5e1fb.png'
  },
  {
    title: 'Mood Booster',
    imageUrl: 'https://res.cloudinary.com/desa0upux/image/upload/v1729229039/la9fafqkxypajto5e1fb.png'
  },
  {
    title: 'Sprout Happiness',
    imageUrl: 'https://res.cloudinary.com/desa0upux/image/upload/v1729229039/la9fafqkxypajto5e1fb.png'
  }
];

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = () => {
    dispatch(setCurrentScreen("welcome"));
  };

  const renderWeekDays = () => (
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
      <Text key={index} style={styles.weekDayText}>{day}</Text>
    ))
  );

  // Calendar data for the first week of March
  const calendarData = [
    { date: 27, isCurrentMonth: false },
    { date: 28, isCurrentMonth: false },
    { date: 1, isCurrentMonth: true },
    { date: 2, isCurrentMonth: true },
    { date: 3, isCurrentMonth: true },
    { date: 4, isCurrentMonth: true },
    { date: 5, isCurrentMonth: true },
  ];

  const renderDates = () => (
    <View style={styles.datesRow}>
      {calendarData.map((item, index) => (
        <View 
          key={index} 
          style={[
            styles.dateCircle,
            item.date === 1 && styles.currentDate,
            !item.isCurrentMonth && styles.prevMonthDate
          ]}
        >
          <Text style={[
            styles.dateText,
            item.date === 1 && styles.currentDateText,
            !item.isCurrentMonth && styles.prevMonthDateText
          ]}>
            {item.date}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>Manaswi</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Feather name="user" size={24} color="#8A2BE2" />
        </TouchableOpacity>
      </View>

      {/* Main Content Container */}
      <View style={styles.mainContent}>
        {/* Heart Image Section */}
        <View style={styles.heartImageContainer}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/desa0upux/image/upload/v1729229944/numudzsiwnwkgwoqzwww.webp' }}
            style={styles.heartImage}
            resizeMode="cover"
          />
        </View>

        {/* Calendar and Articles Container */}
        <View style={styles.bottomContainer}>
          {/* Calendar Section */}
          <View style={styles.calendarContainer}>
            <Text style={styles.monthText}>March 2022</Text>
            <View style={styles.weekDays}>{renderWeekDays()}</View>
            {renderDates()}
          </View>

          {/* Articles Section */}
          <View style={styles.articleContainer}>
            <View style={styles.articleHeader}>
              <Text style={styles.sectionTitle}>Article</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.articleCards}>
              {articleData.map((article, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.articleCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.articleImageContainer}>
                    <Image
                      source={{ uri: article.imageUrl }}
                      style={styles.articleImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6FF',
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  heartImageContainer: {
    height: '45%',
    marginVertical: height * 0.02,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heartImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  bottomContainer: {
    height: '45%',
    justifyContent: 'space-between',
  },
  calendarContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: width * 0.04,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekDayText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
    width: width * 0.1,
    textAlign: 'center',
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateCircle: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDate: {
    backgroundColor: '#FF69B4',
    elevation: 2,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  prevMonthDate: {
    opacity: 0.5,
  },
  dateText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  currentDateText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  prevMonthDateText: {
    color: '#999',
  },
  articleContainer: {
    marginTop: height * 0.02,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#FF69B4',
    fontSize: 14,
    fontWeight: '600',
  },
  articleCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articleCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 8,
    alignItems: 'center',
    width: width * 0.28,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  articleImageContainer: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  articleImage: {
    width: '100%',
    height: '100%',
  },
  articleTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    paddingHorizontal: 4,
  },
});

export default HomeScreen;