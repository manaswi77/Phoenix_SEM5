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
import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentFeature } from "../../contexts/securityFeatureSlice";
import { Picker } from "@react-native-picker/picker";

const SecurityTimerScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(15);
  const [isSafetyTimerEnabled, setIsSafetyTimerEnabled] =
    useState<boolean>(false);
  const [contactNumbers, setContactNumbers] = useState<string[]>([""]); // State to hold contact numbers

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
      // Save timer and contact info logic here
      Alert.alert(
        "Settings Saved",
        `Timer set for ${hours} hours and ${minutes} minutes. Contacts: ${contactNumbers.join(", ")}`
      );
    }
  };

  const addContactField = () => {
    setContactNumbers([...contactNumbers, ""]); // Add a new empty contact field
  };

  const handleContactChange = (text: string, index: number) => {
    const updatedContacts = [...contactNumbers];
    updatedContacts[index] = text; // Update the specific contact field
    setContactNumbers(updatedContacts);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.safetyTimerMainContainer} // Use contentContainerStyle
    >
      <View style={styles.safetyTimerInfo}>
        <View style={styles.safetyTimerInfoTop}>
          <Text style={styles.title}>Enable Safety Timer</Text>
          <Switch
            value={isSafetyTimerEnabled}
            onValueChange={(value) => setIsSafetyTimerEnabled(value)}
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
          {contactNumbers.map((contact, index) => (
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
          disabled={!isSafetyTimerEnabled} // Disable save if the safety timer is off
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
    flexGrow: 1, // Use flexGrow to allow the container to expand with content
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 100,
  },
  colon: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  contactInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  contactInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addContactButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  safetyTimerInfo: {
    marginBottom: 20,
  },
  safetyTimerSettings: {
    width: "100%",
  },
  safetyTimerSetContainer: {
    marginBottom: 20,
  },
  disabledSection: {
    opacity: 0.5,
  },
  safetyTimerInfoTop: {},
  safetyTimerInfoBottom: {},
});
