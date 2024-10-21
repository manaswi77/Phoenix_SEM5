import { StyleSheet, Text, View, BackHandler, ScrollView, TouchableOpacity , TextInput} from "react-native";
import React, { useEffect} from "react";
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
        <Text style={styles.infoText}>In this feature, we provide users with immediate 
          access to emergency assistance. With a single tap, users 
          can alert designated contacts or emergency services, sending 
          their location and a distress message. A message will go to 
          the nearby police station and nirbhaya pathak automatically. </Text>

      </View>

      
      <View style={styles.contactInputContainer}> 
          <Text style={styles.contactTitle}>Enter Emergency Contacts</Text>
          {safetyTimerContacts.map((contact, index) => (
            <TextInput
              key={index}
              style={styles.contactInput}
              placeholder={`Contact Number ${index + 1}`}
              value={contact}
              onChangeText={(text) => handleSave()}
              keyboardType="phone-pad"
            />
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={addContact}
          >
            <Text style={styles.buttonText}>Add Another Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        </View>
        
    </ScrollView>
  );
};

export default SOSButtonScreen;

const styles = StyleSheet.create({
  SOSButtonMainContainer: {
    padding: 20,
    backgroundColor: "#f2d7f7",
    borderRadius: 10,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    lineHeight: 22,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "roboto",
  },
  SOSContacts: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#9067c6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactInputContainer: {
    padding: 20,
    backgroundColor: "#f2d7f7",
    borderRadius: 10,
    margin: 10,
    borderColor: "#f2d7f7",
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  contactInput: {
    backgroundColor: "#fff",
    borderColor: "#7A4791",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    color: "#7A4791",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
});


