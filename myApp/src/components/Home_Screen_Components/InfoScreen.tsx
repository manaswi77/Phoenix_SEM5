import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello User</Text>
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
