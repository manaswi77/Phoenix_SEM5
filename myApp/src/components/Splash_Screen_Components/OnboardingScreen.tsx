import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  BackHandler,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setCurrentScreen } from "../../contexts/screenSlice";

const { width, height } = Dimensions.get("window");

interface OnboardingItem {
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
}

const onboardingData: OnboardingItem[] = [
  {
    title: "Track your health activity with lofee",
    description:
      "Lofee - your female health assistant helps you to track all calendar periods activity and give you suggestions",
    image: "https://v0.dev/placeholder.svg?height=400&width=300&text=Woman+Sitting",
    backgroundColor: "#E0FFFF",
  },
  {
    title: "Read our articles for more experience",
    description:
      "Our articles cover your casual activities, like cooking, fashion style, health and more about women's interests",
    image: "https://v0.dev/placeholder.svg?height=400&width=300&text=Reading+Articles",
    backgroundColor: "#FFEFD5",
  },
  {
    title: "Consult with doctors about your health",
    description:
      "Chat with doctors for health consultations, and even purchase medicines all within one app",
    image: "https://v0.dev/placeholder.svg?height=400&width=300&text=Doctor+Consultation",
    backgroundColor: "#FFF0F5",
  },
];

const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const backAction = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      dispatch(setCurrentScreen("welcome"));
    }
  };

  const handleSkip = () => {
    dispatch(setCurrentScreen("welcome"));
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentItem.backgroundColor }]}>
      <StatusBar backgroundColor={currentItem.backgroundColor} barStyle="dark-content" />
      <View style={styles.imageContainer}>
        <Image source={{ uri: currentItem.image }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{currentItem.title}</Text>
        <Text style={styles.description}>{currentItem.description}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: "contain",
  },
  contentContainer: {
    width: '100%',
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  nextButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  skipText: {
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "#8A2BE2",
    width: 20,
  },
});

export default OnboardingScreen;