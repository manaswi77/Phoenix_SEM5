import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentFeature } from "../../contexts/securitySlice";

const FeaturesScreen = () => {

  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.featureScreenContainer}>
      <View style={styles.incidentBtn}>
        <TouchableOpacity onPress={() => dispatch(setCurrentFeature("incidentReporting"))}
        ></TouchableOpacity>
      </View>
      <View style={styles.safetyTimerBtn}></View>
      <View style={styles.SOSBtn}></View>
    </View>
  );
};

export default FeaturesScreen;

const styles = StyleSheet.create({
  featureScreenContainer: {},
  incidentBtn: {},
  SOSBtn : {},  
  safetyTimerBtn: {},
})