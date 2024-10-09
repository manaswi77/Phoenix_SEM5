import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setCurrentScreen } from "../../contexts/screenSlice";
import { AppDispatch } from "../../store/store";
import React from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password too short")
    .max(16, "Password too long")
    .required("Required"),
});

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginMessage}>
        Welcome back! Glad to see you, Again!
      </Text>
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
              placeholder="Enter Your Email"
              style={styles.loginMailInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={styles.inputError}>{errors.email}</Text>
            ) : null}
            <TextInput
              placeholder="Enter Your Password"
              style={styles.loginPasswordInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password ? (
              <Text style={styles.inputError}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => dispatch(setCurrentScreen("forgotPassword"))}
            >
              <Text style={styles.forgotPassword}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.loginOptionsText}>Or Login with</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.loginOptionsContainer}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726831946/fk6wxvosan61dh7slbcd.png",
                  }}
                  style={styles.loginOptionImage}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726910675/pwu1b4kdgpcbqrxvwq4y.jpg",
                  }}
                  style={styles.loginOptionImage}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726911153/cy5ac0gtxagrbr8zxkxq.jpg",
                  }}
                  style={styles.loginOptionImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.noAccountContainer}>
              <Text>Don't Have an Account ? </Text>
              <TouchableOpacity
                onPress={() => dispatch(setCurrentScreen("register"))}
              >
                <Text style={styles.registerNowText}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  loginMessage: {
    fontSize: 35,
    marginBottom: 40,
  },
  loginMailInput: {
    borderColor: "#AE81D9",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 9,
    padding: 10,
  },
  registerNowText: {
    color: "#7A4791",
    fontWeight: "bold",
  },
  loginPasswordInput: {
    borderColor: "#AE81D9",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 9,
    padding: 10,
  },
  loginOptionsText: {
    marginHorizontal: 10,
    textAlign: "center",
  },
  loginOptionImage: {
    height: 55,
    width: 55,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  loginOptionsContainer: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  loginButton: {
    backgroundColor: "#7A4791",
    borderRadius: 5,
    padding: 14,
    color: "#FFFFFF",
  },
  loginText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 10,
  },
  noAccountContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  inputError: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default LoginScreen;
