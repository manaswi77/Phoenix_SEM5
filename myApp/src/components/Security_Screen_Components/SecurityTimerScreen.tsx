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
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentFeature,
  setSafetyTimerState,
  updateSafetyTimerTimeInterval,
  addSafetyTimerContact,
} from "../../contexts/securityFeatureSlice";
import { Picker } from "@react-native-picker/picker";

const SafetyConfirmationPopup = ({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <Modal transparent visible={visible} animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Please confirm your safety</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.modalButton}>
            <Text style={styles.buttonText}>I'm Safe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.modalButton}>
            <Text style={styles.buttonText}>I'm Not Safe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

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

  const [hours, setHours] = useState<number>(safetyTimerInterval[0]);
  const [minutes, setMinutes] = useState<number>(safetyTimerInterval[1]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

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
        `Timer set for ${hours} hours and ${minutes} minutes.}`
      );

      setTimeout(
        () => {
          setPopupVisible(true); // Show popup when timer expires
        },
        (hours * 60 + minutes) * 60 * 1000
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

  const handleSafeAction = () => {
    setPopupVisible(false);
    // Additional logic if needed
  };

  const handleNotSafeAction = () => {
    Alert.alert(
      "Emergency Alert",
      "Your location has been sent to your emergency contacts."
    );
    setPopupVisible(false);
    // Add logic to send SMS to contacts here
  };

  return (
    <ScrollView
      contentContainerStyle={styles.safetyTimerMainContainer}
      showsVerticalScrollIndicator={false}
    >
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

      <View>
        <View>
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

      <SafetyConfirmationPopup
        visible={popupVisible}
        onConfirm={handleSafeAction}
        onCancel={handleNotSafeAction}
      />
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
  safetyTimerInfo: {
    marginBottom: 20,
  },
  safetyTimerInfoTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  safetyTimerInfoBottom: {
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
    borderColor: "#7A4791",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addContactButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#5D6D7E",
    borderRadius: 5,
    marginTop: 5,
  },
  saveButton: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#5D6D7E",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#5D6D7E",
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
});
