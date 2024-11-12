import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Vibration,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { RAKSHITA_SERVER, TEST_NUMBER } from "@env";
import { sendSmsWithLocation } from "../../utils/notifications.utils";

const EmergencyScreen: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [message, setMessage] = useState("");
  const username = useSelector((state: RootState) => state.appUser.user?.name);
  const user = useSelector((state: RootState) => state.appUser.user);

  const [socket, setSocket] = useState<Socket | null>(null);
  let locationInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    const newSocket = io(RAKSHITA_SERVER);
    setSocket(newSocket);

    newSocket.on("receiveMessageFromWeb", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    locationInterval = setInterval(() => {
      sendLocationToServer();
    }, 120000);

    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [socket]);

  const sendLocationToServer = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Please enable location services."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const locationLink = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

      socket?.emit("sendLocationToWeb", {
        userId: user?.uid,
        username: username || "User",
        location: locationLink,
      });

      console.log("Location sent to the server.");
    } catch (error) {
      console.error("Error sending location:", error);
    }
  };

  const handleSafe = () => {
    socket?.emit("safe", { userId: user?.uid });

    if (locationInterval) clearInterval(locationInterval);

    ToastAndroid.showWithGravity(
      "You're marked as safe!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

  const handleSendLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Please enable location services to use the SOS feature."
        );
        setLocationLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const locationLink = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

      await sendSmsWithLocation(
        TEST_NUMBER,
        username || "User",
        locationLink,
        "emergency"
      );

      ToastAndroid.showWithGravity(
        "Your location was sent to pre-selected contacts successfully",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.error("Error sending SMS:", error);
      Alert.alert("Error Sending Location", "Please try again later.");
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      socket?.emit("sendMessageToWeb", { message });
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    } else {
      ToastAndroid.showWithGravity(
        "Please enter a message before sending.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This is the emergency screen. You will receive updates on your
        assistance here, and you can also provide additional help to ensure a
        faster response.
      </Text>

      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBox}>
            <Text style={styles.messageText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your message here"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={handleSendLocation}>
          {locationLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Send Location to Contacts</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSafe}>
          <Text style={styles.buttonText}>I'm Safe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  messageContainer: {
    marginBottom: 20,
    flex: 1,
  },
  messageBox: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  messageText: {
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
