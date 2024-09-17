import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useScreenContext } from "../../contexts/HomeScreenContext";

const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen } = useScreenContext();

  return (
    <SafeAreaView style={styles.welcomeMainContainer}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726050669/ygsi5zmj3ufblvymizym.png",
        }}
        style={styles.image}
      />
      <Text>
        Hi There! I'm Shreeyash Dongarkar. I like cats. and i hate dr. strange
      </Text>
      <View style={styles.welcomeScreenButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentScreen("login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentScreen("register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ceb3f5",
    borderWidth: 10,
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
  welcomeScreenButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#b33b85",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WelcomeScreen;
