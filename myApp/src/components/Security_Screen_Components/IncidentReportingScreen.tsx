import {
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentFeature } from "../../contexts/securityFeatureSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";

const incidentReportingSchema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits"),
});

const IncidentReportingScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string | null>(null);

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

  const handleImageUpload = async () => {
    // Implement your image upload logic here (e.g., using ImagePicker)
    setImage("path_to_your_image"); // Replace with actual image path
  };

  const handleSubmit = (values: any) => {
    Alert.alert("Form Submitted", JSON.stringify(values, null, 2));
    // Add your form submission logic here (e.g., dispatch an action or API call)
  };

  const handleBackPress = () => {
    dispatch(setCurrentFeature("features"));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Hides the scroll bar
      >
        <View style={styles.incidentReportingMainContainer}>
          {/* Back Arrow Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.incidentReportingInfo}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Report an Incident</Text>
            </View>
            <Text style={styles.description}>
              Quickly seek help from government authorities or support
              organizations in cases of domestic abuse or other wrongful acts.
              This feature enables you to provide essential details, including
              images, location, and a description of the incident, to ensure
              timely and effective assistance.
            </Text>
          </View>

          <Formik
            initialValues={{
              name: "",
              description: "",
              location: "",
              contact: "",
            }}
            validationSchema={incidentReportingSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                {/* Image Upload Section */}
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleImageUpload}
                >
                  <Text style={styles.uploadButtonText}>
                    {image ? "Change Image" : "Upload Image"}
                  </Text>
                </TouchableOpacity>
                {image && (
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                )}

                {/* Name Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                {/* Description Input */}
                <TextInput
                  style={styles.inputMultiline}
                  placeholder="Description"
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  multiline
                  numberOfLines={4}
                />
                {errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                {/* Location Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
                {errors.location && (
                  <Text style={styles.errorText}>{errors.location}</Text>
                )}

                {/* Contact Number Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Contact Number"
                  onChangeText={handleChange("contact")}
                  onBlur={handleBlur("contact")}
                  value={values.contact}
                  keyboardType="numeric"
                />
                {errors.contact && (
                  <Text style={styles.errorText}>{errors.contact}</Text>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.submitButtonText}>Submit Report</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default IncidentReportingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollContainer: {
    paddingBottom: 60,
    marginBottom: 20,
  },
  incidentReportingMainContainer: {
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 40,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },
  uploadButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  inputMultiline: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  incidentReportingInfo: {
    marginBottom: 20,
  },
});
