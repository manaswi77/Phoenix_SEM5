import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../contexts/screenSlice";
import { AppDispatch } from "../../store/store";

const InfoScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = () => {
    dispatch(setCurrentScreen("welcome"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello User</Text>
      {/* <Button onPress={handlePress} title="Back to Welcome" /> */}

      <TouchableOpacity style={styles.emergencyButton}>
        <Text>Emergency Button</Text>
      </TouchableOpacity>
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
  emergencyButton: {
    borderRadius: 100,
    backgroundColor: "red",
  },
});

export default InfoScreen;
