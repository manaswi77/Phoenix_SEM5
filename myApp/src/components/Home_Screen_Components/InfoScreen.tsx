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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>Manaswi</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Feather name="user" size={20} color="#8A2BE2" />
        </TouchableOpacity>
      </View>

      <View style={styles.heartImageContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/desa0upux/image/upload/v1729229944/numudzsiwnwkgwoqzwww.webp' }}
          style={styles.heartImage}
          resizeMode="contain"
        />
        {/* <View style={styles.heartTextOverlay}>
          <Text style={styles.periodText}>Period:</Text>
          <Text style={styles.dayText}>Day 10</Text>
          <Text style={styles.pregnancyText}>Possible Pregnancy:</Text>
          <Text style={styles.percentageText}>12,4%</Text>
        </View> */}
      </View>
       
      <View style={styles.calendarContainer}>
        <Text style={styles.monthText}>March 2022</Text>
        <View style={styles.weekDays}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.dates}>
          {[27, 28, 1, 2, 3].map((date, index) => (
            <View key={index} style={[styles.dateCircle, date === 1 && styles.currentDate]}>
              <Text style={[styles.dateText, date === 1 && styles.currentDateText]}>{date}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.articleContainer}>
        <View style={styles.articleHeader}>
          <Text style={styles.sectionTitle}>Article</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.articleCards}>
          {articleData.map((article, index) => (
            <TouchableOpacity key={index} style={styles.articleCard}>
              <Image
                source={{ uri: article.imageUrl }}
                style={styles.articleImage}
              />
              <Text style={styles.articleTitle}>{article.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7FC',
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  welcomeText: {
    fontSize: width * 0.035,
    color: '#888',
  },
  nameText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartImageContainer: {
    width: width * 0.9,
    height: width * 0.9,
    alignSelf: 'center',
    marginBottom: height * 0.02,
    position: 'relative',
    borderRadius : 15,
    backgroundColor: 'transparent',
  },
  heartImage: {
    width: '100%',
    height: '100%',
    borderRadius : 45,
    backgroundColor: 'transparent',
  },
  heartTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodText: {
    fontSize: width * 0.04,
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  dayText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pregnancyText: {
    fontSize: width * 0.035,
    color: '#FFF',
    marginTop: height * 0.01,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  percentageText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  calendarContainer: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.05,
    padding: width * 0.04,
    marginBottom: height * 0.02,
  },
  monthText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  weekDayText: {
    color: '#888',
    fontSize: width * 0.03,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateCircle: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDate: {
    backgroundColor: '#FF69B4',
  },
  dateText: {
    color: '#333',
    fontSize: width * 0.03,
  },
  currentDateText: {
    color: '#FFF',
  },
  articleContainer: {
    marginBottom: height * 0.02,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FF69B4',
    fontSize: width * 0.03,
  },
  articleCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articleCard: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.03,
    padding: width * 0.02,
    alignItems: 'center',
    width: width * 0.28,
  },
  articleImage: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.02,
    marginBottom: height * 0.005,
  },
  articleTitle: {
    textAlign: 'center',
    fontSize: width * 0.025,
  },
});

export default HomeScreen;