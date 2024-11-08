import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { auth, firestore } from "../../config/firebase.config";
import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";

/**
 * Log in a user with email and password
 * @param email - User's email
 * @param password - User's password
 */
const loginUser = async (email: string, password: string) => {
  try {
    // Sign in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log(userCredential);

    const accessToken = await getIdToken(user, true); 

    return { user, accessToken };
  } catch (error) {
    throw error;
  }
};

/**
 * Register a new user
 * @param email - User's email
 * @param password - User's password
 * @param username - User's chosen username
 */
const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const accessToken = await getIdToken(user, true);

    const userData = {
      uid: user.uid,
      email: user.email,
      username,
      profilePhotoUrl: "",
      contactNumber: "",
      SOSButtonContacts: ["", "", ""],
      SafetyTimerContacts: ["", "", ""],
      SafetyTimerInterval: [0, 15],
      savedPosts: [],
      createdAt: new Date(),
    };

    await setDoc(doc(firestore, "users", user.uid), userData);

    return { user, accessToken };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const refreshAccessToken = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const newIdToken = await currentUser.getIdToken(true);
    console.log("New access token:", newIdToken);
    return newIdToken;
  } else {
    throw new Error("No active user session found.");
  }
};

const getCurrentUserInfomation = async (uid: string) => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      throw new Error("No user found with the given UID.");
    }
  } catch (error) {
    console.error("Error getting user information:", error);
    throw error;
  }
};

export {
  loginUser,
  registerUser,
  refreshAccessToken,
  getCurrentUserInfomation,
};
