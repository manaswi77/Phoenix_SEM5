import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useScreenContext } from "../../contexts/HomeScreenContext";

const InfoScreen: React.FC = () => {
  const { setCurrentScreen } = useScreenContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello User</Text>
      <Button
        onPress={() => setCurrentScreen("welcome")}
        title="back to welcome"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default InfoScreen;
