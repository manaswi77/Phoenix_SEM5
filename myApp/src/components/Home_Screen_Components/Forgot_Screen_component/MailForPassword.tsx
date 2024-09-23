import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  setPasswordScreenStage,
  setEmailForPasswordChange,
} from "../../../contexts/changePasswordSlice";
import { AppDispatch } from "../../../store/store";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const MailForPassWord = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleForgotPassword = (values: { email: string }) => {
    dispatch(setEmailForPasswordChange(values.email));
    dispatch(setPasswordScreenStage("otp"));
  };

  return (
    <View style={styles.mailContainer}>
      <Text style={styles.forgotPassText}>Forgot Password ?</Text>

      <Text style={styles.infoText}>
        Don't worry! It happens. Please enter the email address linked with your
        account.
      </Text>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => handleForgotPassword(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Enter your email"
              style={styles.enterEmailInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.sendCodebutton}
              onPress={handleSubmit as any}
            >
              <Text style={styles.sendCodeButtonText}>Send Code</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  mailContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  forgotPassText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 7,
  },
  enterEmailInput: {
    borderColor: "#AE81D9",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 9,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
  sendCodebutton: {
    marginTop: 15,
    backgroundColor: "#7A4791",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 350,
  },
  sendCodeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    marginTop: 2,
    fontSize: 14,
    color: "#6C757D",
    marginBottom: 20,
  },
});

export default MailForPassWord;
