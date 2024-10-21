import * as SMS from "expo-sms";
import * as Location from "expo-location";
import nodemailer from "nodemailer";
import { ORGANIZATION_MAIL, ORGANIZATION_PASSWORD } from "@env";

const sendSmsWithLocation = async (
  phoneNumber: string,
  predefinedMessage: string,
  extraString: string
) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const message = `${predefinedMessage} ${extraString}\nLocation: https://maps.google.com/?q=${latitude},${longitude}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync([phoneNumber], message);
      return result;
    } else {
      throw new Error("SMS service is not available on this device");
    }
  } catch (error) {
    console.error("Error sending SMS: ", error);
    throw error;
  }
};

const sendWelcomeMail = async (username: string, toEmail: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ORGANIZATION_MAIL,
        pass: ORGANIZATION_PASSWORD,
      },
    });

    const mailOptions = {
      from: ORGANIZATION_MAIL,
      to: toEmail,
      subject: "Welcome to our organization!",
      text: `Hello ${username}, thank you for joining our organization!`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export { sendSmsWithLocation, sendWelcomeMail };
