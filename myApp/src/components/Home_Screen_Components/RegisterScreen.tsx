import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setCurrentScreen, setIsLoggedIn } from "../../contexts/screenSlice";
import { AppDispatch } from "../../store/store";
import {
  getCurrentUserInfomation,
  registerUser,
  registerSocialUser,
} from "../../services/firebase/auth.services";
import {
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
  User,
} from "firebase/auth";
import { WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { FirebaseError } from "firebase/app";
import { auth } from "@/src/config/firebase.config";
import { CurrentUser, UserSession } from "@/src/types/types";
import { setSession, setUser } from "@/src/contexts/userSlice";
import {
  setSafetyTimerContacts,
  setSOSButtonContacts,
  updateSafetyTimerTimeInterval,
} from "@/src/contexts/securityFeatureSlice";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });

  const [fontsLoaded] = useFonts({
    Faculty_Glyphic: require("../../../assets/Fonts/FacultyGlyphic-Regular.ttf"),
    Oxygen_Regular: require("../../../assets/Fonts/Oxygen-Regular.ttf"),
    Tajawal_Medium: require("../../../assets/Fonts/Tajawal-Medium.ttf"),
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const saveUserInformation = async (uid: User["uid"]) => {
    try {
      const userInformation = await getCurrentUserInfomation(uid);

      const CurrentUserInfo: CurrentUser = {
        uid: uid,
        email: userInformation.email,
        name: userInformation.username,
        profilePhoto: userInformation.profilePhotoUrl,
        contactNumber: userInformation.contactNumber,
      };

      const CurrentUserSession: UserSession = {
        token: "",
        isLoggedIn: true,
      };

      dispatch(setUser(CurrentUserInfo));
      dispatch(setSession(CurrentUserSession));
      dispatch(
        updateSafetyTimerTimeInterval(
          userInformation.SafetyTimerInterval || [0, 15]
        )
      );
      dispatch(
        setSOSButtonContacts(userInformation.SOSButtonContacts) || ["", "", ""]
      );
      dispatch(
        setSafetyTimerContacts(userInformation.SafetyTimerContacts) || [
          "",
          "",
          "",
        ]
      );
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        Alert.alert("Login Failed", error.message);
      } else {
        Alert.alert("Unknown Error Occurred", "Please try again later");
      }
    }
  };

  const handleRegister = async (
    values: {
      email: string;
      password: string;
      confirmPassword: string;
      username: string;
    },
    resetForm: () => void
  ) => {
    setLoading(true);
    try {
      const { user } = await registerUser(
        values.email,
        values.password,
        values.username
      );

      resetForm();

      await sendEmailVerification(user);

      Alert.alert(
        "A verification email has been sent to your email address.",
        "",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch(setIsLoggedIn(false));
              dispatch(setCurrentScreen("login"));
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Registration failed");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign-In User Info:", userInfo);
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error("Google Sign-In Error: No ID Token");
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);

      await registerSocialUser(userCredential.user);

      await saveUserInformation(userCredential.user.uid);

      ToastAndroid.showWithGravity(
        "Registration Successful",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );

      dispatch(setIsLoggedIn(true));
      dispatch(setCurrentScreen("info"));
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      const errorMessage = (error as FirebaseError).message;
      Alert.alert("Google Sign-In Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#9067c6" />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.registerContainer,
          keyboardVisible && { paddingTop: 150 },
        ]}
      >
        <Text style={styles.registerMessage}>
          Hello! Register to Get Started
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { resetForm }) => {
            handleRegister(values, resetForm);
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
                placeholder="Username"
                style={styles.registrationInput}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {touched.username && errors.username ? (
                <Text style={styles.inputError}>{errors.username}</Text>
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
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.registerText}>Register</Text>
                )}
              </TouchableOpacity>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.registerOptionstext}>Or Register with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.registerOptionsContainer}>
                <TouchableOpacity onPress={handleGoogleSignUp}>
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/desa0upux/image/upload/v1726831946/fk6wxvosan61dh7slbcd.png",
                    }}
                    style={styles.registerOptionImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.accExists}>
                <Text style={styles.dontHaveAccountText}>
                  Already have an account?{" "}
                </Text>
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
    </KeyboardAvoidingView>
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
  dontHaveAccountText: {
    fontFamily: "Oxygen_Regular",
  },
  accExistsText: {
    color: "#9067c6",
    fontFamily: "Oxygen_Regular",
  },
  goToLoginBtn: {
    backgroundColor: "#9067c6",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  registrationInput: {
    borderColor: "#9067c6",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 12,
    padding: 10,
    fontFamily: "Oxygen_Regular",
  },
  registerText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Oxygen_Regular",
  },
  registerButton: {
    marginTop: 17,
    marginBottom: 5,
    backgroundColor: "#9067c6",
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
    fontFamily: "Faculty_Glyphic",
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
    fontFamily: "Tajawal_Medium",
  },
  registerOptionstext: {
    marginHorizontal: 10,
    textAlign: "center",
    fontFamily: "Oxygen_Regular",
  },
  registerOptionsContainer: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegisterScreen;
