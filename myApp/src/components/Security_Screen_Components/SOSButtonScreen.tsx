import { StyleSheet, Text, View, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFeature, setSOSButtonState, addSOSButtonContact } from "../../contexts/securityFeatureSlice";

const SOSButtonScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const backAction = () => {
      dispatch(setCurrentFeature("features"));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [dispatch]);

  const safetyTimerContacts = useSelector(
    (state: RootState) => state.securityFeature.safetyTimerContacts
  );

  const addContact = () => {

  }

  const handleSave = () => {}

  return (
    <ScrollView>
   
      <View style={styles.SOSButtonMainContainer}>
        <Text>In this feature, we provide users with immediate 
          access to emergency assistance. With a single tap, users 
          can alert designated contacts or emergency services, sending 
          their location and a distress message. A message will go to 
          the nearby police station and nirbhaya pathak automatically. </Text>
      </View>

      <View style={styles.SOSContacts}>
        <TouchableOpacity
          style={styles.addContactButton}
          onPress={addContact}
        >
          <Text>Add Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SOSButtonScreen;

const styles = StyleSheet.create({
  SOSButtonMainContainer: {},
  SOSContacts : {},
  addContactButton: {},
  saveButton: {},
  saveButtonText: {},
});
