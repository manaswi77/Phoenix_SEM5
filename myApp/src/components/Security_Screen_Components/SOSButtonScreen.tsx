import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentFeature,
  setSOSButtonContacts,
} from "../../contexts/securityFeatureSlice";
import { setCurrentScreen } from "../../contexts/screenSlice";
import { updateUserData } from "../../services/firebase/securityScreen.services";

const SOSButtonScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const uid = useSelector((state: RootState) => state.appUser.user?.uid);
  const SOSButtonContacts = useSelector(
    (state: RootState) => state.securityFeature.SOSButtonContacts
  );
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [contacts, setContacts] = useState<string[]>(() => {
    const updatedContacts = [...SOSButtonContacts];
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

  const handleContactChange = (index: number, text: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = text;
    setContacts(updatedContacts);
    setIsChanged(true);
  };

  const handleSave = async () => {
    setLoading(true);
    if (uid) {
      const isSuccess = await updateUserData(uid, {
        SOSButtonContacts: contacts,
      });
      if (isSuccess) {
        dispatch(setSOSButtonContacts(contacts));
        setLoading(false);
        ToastAndroid.showWithGravity(
          "SOS Button Contacts Saved",
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Failed to save contacts. Please try again.");
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Heading */}
      <Text style={styles.heading}>Emergency SOS Button</Text>

      {/* Description Container */}
      <View style={styles.SOSButtonMainContainer}>
        <Text style={styles.infoText}>
          This feature enables users to quickly access emergency assistance.
          With a single tap, they can instantly notify their designated contacts
          or emergency services, sharing their current location along with a
          distress message to ensure prompt help.
        </Text>

        {/* Image below description */}
        <Image
          source={{
            uri: "https://res.cloudinary.com/desa0upux/image/upload/v1731178507/dwnplkw7sjrrxwgcehv5.png", // Replace with your actual image link
          }}
          style={styles.infoImage}
        />
      </View>

      <View style={styles.contactInputContainer}>
        <Text style={styles.contactTitle}>Enter Emergency Contacts</Text>

        {/* Always show 3 contact inputs */}
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

export default SOSButtonScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#7A4791",
  },
  SOSButtonMainContainer: {
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
  changeMessage: {
    fontSize: 14,
    color: "#f75252",
    marginTop: 5,
    textAlign: "center",
  },
});
