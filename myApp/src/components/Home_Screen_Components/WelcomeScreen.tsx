import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useScreenContext } from "../../contexts/HomeScreenContext";

const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen } = useScreenContext();

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Button title="Login" onPress={() => setCurrentScreen("login")} />
      <Button title="Register" onPress={() => setCurrentScreen("register")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
