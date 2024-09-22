import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  setOTPStatus,
  setPasswordScreenStage,
} from "../../../contexts/changePasswordSlice";
import { AppDispatch } from "../../../store/store";

const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .length(4, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

const OTPVerification: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);

  const handleOTPSubmission = (values: { otp: string }) => {
    const isOTPCorrect = values.otp === otpValues.join("");
    dispatch(setOTPStatus(isOTPCorrect));
    dispatch(setPasswordScreenStage("changed"));
  };

  const handleOtpChange = (
    value: string,
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);
    setFieldValue("otp", updatedOtp.join(""));
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={OTPSchema}
      onSubmit={handleOTPSubmission}
    >
      {({ handleSubmit, errors, touched, setFieldValue }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Enter OTP</Text>

          <View style={styles.otpContainer}>
            {otpValues.map((otp, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={otp}
                onChangeText={(value) =>
                  handleOtpChange(value, index, setFieldValue)
                }
              />
            ))}
          </View>

          {errors.otp && touched.otp && (
            <Text style={styles.errorText}>{errors.otp}</Text>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default OTPVerification;
