import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentFeature } from "../../contexts/securitySlice";
import { SecurityScreenType } from "../../types/types";

const FeaturesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (security: SecurityScreenType) => {
    dispatch(setCurrentFeature(security));
  };

  return (
    <View style={styles.featureScreenContainer}>
      <View style={styles.featureContainer}>
        <TouchableOpacity onPress={() => handlePress("sosBtn")}>
          <Text>SOS Button</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featureContainer}>
        <TouchableOpacity onPress={() => handlePress("incidentReporting")}>
          <Text>Incident Reporting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featureContainer}>
        <TouchableOpacity>
          <Text onPress={() => handlePress("safetyTimer")}>Safety Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeaturesScreen;

const styles = StyleSheet.create({
  featureScreenContainer: {},
  featureContainer: {},
  SOSBtn: {},
  safetyTimerBtn: {},
});
