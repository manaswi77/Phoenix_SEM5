import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setCurrentScreen } from "../../contexts/screenSlice";
import { AppDispatch } from "../../store/store"; 

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password too short")
    .max(16, "Password too long")
    .required("Required"),
});

const LoginScreen: React.FC = () => {

  // TODO: Add firebase API Calls to login
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={() => {
          dispatch(setIsLoggedIn(true));
          dispatch(setCurrentScreen("info"));
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

            <Button onPress={handleSubmit as any} title="Login" />
            <Button
              title="Don't have an account? Register"
              onPress={() => dispatch(setCurrentScreen("register"))}
            />
            <Button
              onPress={() => dispatch(setCurrentScreen("welcome"))}
              title="Back to welcome"
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

export default LoginScreen;
