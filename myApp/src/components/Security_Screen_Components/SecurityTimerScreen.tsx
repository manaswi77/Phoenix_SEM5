import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentFeature,
  setSafetyTimerState,
  updateSafetyTimerTimeInterval,
  setSafetyTimerContacts,
} from "../../contexts/securityFeatureSlice";
import { setCurrentScreen } from "../../contexts/screenSlice";
import { Picker } from "@react-native-picker/picker";
import { updateUserData } from "../../services/firebase/securityScreen.services";

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
  const SafetyTimerContacts = useSelector(
    (state: RootState) => state.securityFeature.safetyTimerContacts
  );

  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [hours, setHours] = useState<number>(safetyTimerInterval[0]);
  const [minutes, setMinutes] = useState<number>(safetyTimerInterval[1]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const [contacts, setContacts] = useState<string[]>(() => {
    const updatedContacts = [...SafetyTimerContacts];
    while (updatedContacts.length < 3) updatedContacts.push("");
    return updatedContacts;
  });

  useEffect(() => {
    const backAction = () => {
      dispatch(setCurrentScreen("security"));
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
  const handleContactChange = (index: number, text: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = text;
    setContacts(updatedContacts);

    setIsChanged(
      updatedContacts.some((contact, i) => contact !== SafetyTimerContacts[i])
    );
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Safety Timer</Text>

      <View style={styles.safetyTimerMainContainer}>
        <Text style={styles.infoText}>
          This feature allows you to set a custom time interval, after which
          you'll receive a prompt to confirm your safety. If you don’t respond
          within the given time, your current location will automatically be
          shared with your selected emergency contacts.{" "}
        </Text>

        {/* Image below description */}
        <Image
          source={{
            uri: "https://res.cloudinary.com/desa0upux/image/upload/v1731178507/dwnplkw7sjrrxwgcehv5.png", // Replace with your actual image link
          }}
          style={styles.infoImage}
        />
      </View>

      <View style={styles.pickerContainerMain}>
        <Text style={styles.timerTitle}>Set Timer</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={hours}
            style={styles.picker}
            onValueChange={(itemValue: number) => setHours(itemValue)}
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
          >
            {[0, 15, 30, 45].map((value) => (
              <Picker.Item key={value} label={`${value}`} value={value} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.contactInputContainer}>
        <Text style={styles.contactTitle}>Enter Emergency Contacts</Text>

        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactRow}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.contactInput}
                placeholder={`Contact Number ${index + 1}`}
                value={contact}
                onChangeText={(text) => handleContactChange(index, text)}
                keyboardType="phone-pad"
              />
              {contact ? (
                <TouchableOpacity
                  onPress={() => handleContactChange(index, "")}
                  style={styles.iconContainer}
                >
                  <AntDesign name="edit" size={20} color="#7A4791" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ))}

        {isChanged && (
          <Text style={styles.changeMessage}>
            Please save the changes to your contacts.
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SecurityTimerScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#7A4791",
  },
  safetyTimerMainContainer: {
    padding: 20,
    backgroundColor: "#f0eff4",
    borderRadius: 10,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  infoImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    marginTop: 10,
  },
  pickerContainerMain: {
    padding: 20,
    backgroundColor: "#f0eff4",
    borderRadius: 10,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
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
  timerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#7A4791",
  },
  safetyTimerInfoBottom: {
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
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
    padding: 20,
    backgroundColor: "#f0eff4",
    borderRadius: 10,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 90,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#7A4791",
  },
  contactRow: {
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#7A4791",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  contactInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#7A4791",
  },
  iconContainer: {
    padding: 10,
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
  },
  changeMessage: {
    fontSize: 14,
    color: "#f75252",
    marginTop: 5,
    textAlign: "center",
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
