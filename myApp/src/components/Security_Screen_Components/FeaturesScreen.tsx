import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentFeature } from "../../contexts/securityFeatureSlice";
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
          <Text style={styles.featureBtn}>SOS Button</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featureContainer}>
        <TouchableOpacity onPress={() => handlePress("incidentReporting")}>
          <Text style={styles.featureBtn}>Incident Reporting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featureContainer}>
        <TouchableOpacity onPress={() => handlePress("safetyTimer")}>
          <Text style={styles.featureBtn}>Safety Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
     
export default FeaturesScreen;

const styles = StyleSheet.create({
  featureScreenContainer: {
    alignContent:  "center",
    justifyContent: "center",
    flex: 1,
  },
  featureContainer: {
    margin: 10,
    padding: 45,
    // backgroundColor:  "#642ca9", 861388
    // backgroundColor: "#242038",
    backgroundColor: "#9067c6",
    borderRadius: 10,
  },
  featureBtn: {
    fontSize:  20,
    textAlign: "center", 
    color: "#fff"
  },
});
