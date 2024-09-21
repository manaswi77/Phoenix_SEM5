import React from "react";
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

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // TODO:  Add firebase API Calls to register
  const handleSubmit = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    dispatch(setIsLoggedIn(true));
    dispatch(setCurrentScreen("info"));
  };

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.registerMessage}>Hello! Register to get started</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
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
              placeholder="Username"
              style={styles.registrationInput}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {touched.email && errors.email ? (
              <Text style={styles.inputError}>{errors.email}</Text>
            ) : null}
            <TextInput
              placeholder="Email"
              style={styles.registrationInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={styles.inputError}>{errors.email}</Text>
            ) : null}

            <TextInput
              placeholder="Password"
              style={styles.registrationInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password ? (
              <Text style={styles.inputError}>{errors.password}</Text>
            ) : null}

            <TextInput
              placeholder="Confirm Password"
              style={styles.registrationInput}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text style={styles.inputError}>{errors.confirmPassword}</Text>
            ) : null}

            <TouchableOpacity
              onPress={handleSubmit as any}
              style={styles.registerButton}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.registerOptionstext}>Or Login with</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.registerOptionsContainer}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726831946/fk6wxvosan61dh7slbcd.png",
                  }}
                  style={styles.registerOptionImage}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726910675/pwu1b4kdgpcbqrxvwq4y.jpg",
                  }}
                  style={styles.registerOptionImage}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726911153/cy5ac0gtxagrbr8zxkxq.jpg",
                  }}
                  style={styles.registerOptionImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.accExists}>
              <Text>Don't Have an Account ? </Text>
              <TouchableOpacity
                onPress={() => dispatch(setCurrentScreen("login"))}
              >
                <Text style={styles.accExistsText}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  accExists: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  accExistsText: {
    color: "#7A4791",
    fontWeight: "bold",
  },
  goToLoginBtn: {
    backgroundColor: "#7A4791",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  registrationInput: {
    borderColor: "#AE81D9",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 12,
    padding: 10,
  },
  registerText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  registerButton: {
    marginTop: 17,
    marginBottom: 5,
    backgroundColor: "#7A4791",
    padding: 16,
    borderRadius: 5,
    fontWeight: "bold",
  },
  registerOptionImage: {
    height: 55,
    width: 55,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  registerMessage: {
    fontSize: 32,
    marginBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  inputError: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  registerOptionstext: {
    marginHorizontal: 10,
    textAlign: "center",
  },
  registerOptionsContainer: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegisterScreen;
