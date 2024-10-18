import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  BackHandler,
  Switch,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentFeature,
  setSafetyTimerState,
  updateSafetyTimerTimeInterval,
  addSafetyTimerContact,
} from "../../contexts/securityFeatureSlice";
import { Picker } from "@react-native-picker/picker";

const SecurityTimerScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const safetyTimerInterval = useSelector(
    (state: RootState) => state.securityFeature.safetyTimerTimeInterval
  );

  const isSafetyTimerEnabled = useSelector(
    (state: RootState) => state.securityFeature.isSafetyTimerEnabled
  );

  const safetyTimerContacts = useSelector(
    (state: RootState) => state.securityFeature.safetyTimerContacts
  );

  const [hours, setHours] = React.useState<number>(safetyTimerInterval[0]);
  const [minutes, setMinutes] = React.useState<number>(safetyTimerInterval[1]);

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

  const validateTime = (): boolean => {
    if (hours === 0 && minutes < 15) {
      Alert.alert("Invalid Input", "Minimum time is 15 minutes.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!isSafetyTimerEnabled) {
      Alert.alert("Safety Timer Disabled", "Please enable the safety timer.");
      return;
    }
    if (validateTime()) {
      dispatch(updateSafetyTimerTimeInterval([hours, minutes]));

      Alert.alert(
        "Settings Saved",
        `Timer set for ${hours} hours and ${minutes} minutes. Contacts: ${safetyTimerContacts.join(", ")}`
      );
    }
  };

  const handleContactChange = (text: string, index: number) => {
    const updatedContacts = [...safetyTimerContacts];
    updatedContacts[index] = text;
    dispatch(addSafetyTimerContact(updatedContacts[index]));
  };

  const addContactField = () => {
    const emptyIndex = safetyTimerContacts.indexOf("");
    if (emptyIndex !== -1) {
      const updatedContacts = [...safetyTimerContacts];
      updatedContacts[emptyIndex] = "";
      dispatch(addSafetyTimerContact(updatedContacts[emptyIndex]));
    } else {
      console.warn("All Safety Timer contacts are already filled.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.safetyTimerMainContainer}
    showsVerticalScrollIndicator={false}>
      
      <View style={styles.safetyTimerInfo}>
        <View style={styles.safetyTimerInfoTop}>
          <Text style={styles.title}>Enable Safety Timer</Text>
          <Switch
            value={isSafetyTimerEnabled}
            onValueChange={(value) => {
              dispatch(setSafetyTimerState());
            }}
          />
        </View>
        <View style={styles.safetyTimerInfoBottom}>
          <Text>
            In this feature, you can set a custom time interval, after which you
            will receive a notification prompting you to confirm your safety. If
            you do not verify within the specified time, your current location
            will automatically be sent to your pre-selected emergency contacts.
          </Text>
        </View>
      </View>

      {/* Timer Settings */}
      <View style={styles.safetyTimerSettings}>
        <View style={styles.safetyTimerSetContainer}>
          <Text style={styles.title}>Set Timer</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hours}
              style={styles.picker}
              onValueChange={(itemValue: number) => setHours(itemValue)}
              enabled={isSafetyTimerEnabled}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <Picker.Item key={index} label={`${index}`} value={index} />
              ))}
            </Picker>
            <Text style={styles.colon}>:</Text>
            <Picker
              selectedValue={minutes}
              style={styles.picker}
              onValueChange={(itemValue: number) => setMinutes(itemValue)}
              enabled={isSafetyTimerEnabled}
            >
              {[0, 15, 30, 45].map((value) => (
                <Picker.Item key={value} label={`${value}`} value={value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Contact Input Fields */}
        <View style={styles.contactInputContainer}>
          <Text style={styles.title}>Enter Emergency Contacts</Text>
          {safetyTimerContacts.map((contact, index) => (
            <TextInput
              key={index}
              style={styles.contactInput}
              placeholder={`Contact Number ${index + 1}`}
              value={contact}
              onChangeText={(text) => handleContactChange(text, index)}
              keyboardType="phone-pad"
            />
          ))}
          <TouchableOpacity
            style={styles.addContactButton}
            onPress={addContactField}
          >
            <Text style={styles.buttonText}>Add Another Contact</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={!isSafetyTimerEnabled}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SecurityTimerScreen;


const styles = StyleSheet.create({
  safetyTimerMainContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f2d7f7", 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 100,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  colon: {
    fontSize: 20,
    marginHorizontal: 5,
    color: "#495057",
  },
  contactInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  contactInput: {
    height: 50,
    borderColor: "#7A4791", // Matching border color
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    color: "#7A4791",
    // fontFamily: "Poppins_400Regular",
  },
  addContactButton: {
    marginTop: 10,
    padding: 14,
    backgroundColor: "#9067c6", // Consistent button color
    borderRadius: 10,
    alignItems: "center",
  },
  saveButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#9067c6",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    // fontFamily: "Poppins_700Bold",
  },
  safetyTimerInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f2d7f7",
    borderRadius: 5,
  },
  safetyTimerSettings: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f2d7f7",
    borderRadius: 5,
  },
  safetyTimerSetContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  disabledSection: {
    opacity: 0.5,
  },
  safetyTimerInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  safetyTimerInfoBottom: {
    marginTop: 10,
    // fontFamily: "Poppins_400Regular",
  },
});
