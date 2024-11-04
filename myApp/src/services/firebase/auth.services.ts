import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { auth, firestore } from "../../config/firebase.config";
import { hashPassword } from "../../utils/password.utils";
import { setDoc, doc } from "firebase/firestore";

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

    // Get Firebase ID token (access token)
    const accessToken = await getIdToken(user, true); // 'true' forces token refresh

    // Firebase automatically manages refresh tokens, so no need to generate them
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
    const hashedPassword = hashPassword(password);

    // Register the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Get Firebase ID token (access token)
    const accessToken = await getIdToken(user, true); // 'true' forces token refresh

    // Store user details in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      hashedPassword: hashedPassword,
      createdAt: new Date(),
    });

    return { user, accessToken };
  } catch (error) {
    throw error;
  }
};

export { loginUser, registerUser };
