import { BACKEND_URL } from "@env";

const sendSmsWithLocation = async (
  phoneNumber: string,
  username: string,
  location: string
) => {
  try {
    const message = `Urgent: An SOS alert has been triggered by ${username}. Please find the emergency location here: ${location}. Kindly reach out immediately to assist.`;
    console.log("Sending SMS:", message);
    const msg = "Hello Angry Bird 😁";

    const response = await fetch(`${BACKEND_URL}/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: msg,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.result;
    } else {
      throw new Error("Failed to send SMS");
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

export { sendSmsWithLocation };
