import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useScreenContext } from "../../contexts/HomeScreenContext";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const RegisterScreen: React.FC = () => {
  const { setIsLoggedIn, setCurrentScreen } = useScreenContext();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={RegisterSchema}
        onSubmit={() => {
          setIsLoggedIn(true);
          setCurrentScreen("info");
        }}
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
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? <Text>{errors.email}</Text> : null}

            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password ? (
              <Text>{errors.password}</Text>
            ) : null}

            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text>{errors.confirmPassword}</Text>
            ) : null}

            <Button onPress={handleSubmit as any} title="Register" />
            <Button
              title="Already have an account? Login"
              onPress={() => setCurrentScreen("login")}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default RegisterScreen;
