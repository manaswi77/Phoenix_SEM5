import { firestore } from "../../config/firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { IncidentReportingFormValues } from "../../types/types";

const getSOSButtonInformation = async (userId: string) => {
  try {
    const sosButtonInfoRef = collection(firestore, "sosButtonInfo");
    const q = query(sosButtonInfoRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched SOS button information:", data);
    return data;
  } catch (error) {
    console.error("Error fetching SOS button information:", error);
    throw error;
  }
};

const getSafetyTimerInformation = async (userId: string) => {
  try {
    const safetyTimerInfoRef = collection(firestore, "safetyTimerInfo");
    const q = query(safetyTimerInfoRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched safety timer information:", data);
    return data;
  } catch (error) {
    console.error("Error fetching safety timer information:", error);
    throw error;
  }
};

const saveSOSButtonReport = async (data: any) => {
  try {
    const sosButtonReportsRef = collection(firestore, "sosButtonReports");
    await addDoc(sosButtonReportsRef, data);
    console.log("SOS button report saved successfully!");
  } catch (error) {
    console.error("Error saving SOS button report:", error);
    throw error;
  }
};

const saveIncidentReport = async (data: IncidentReportingFormValues) => {
  try {
    const incidentsRef = collection(firestore, "incidentReports");
    await addDoc(incidentsRef, data);
    console.log("Incident report saved successfully!");
  } catch (error) {
    console.error("Error saving incident report:", error);
    throw error;
  }
};

const saveSafetyTimerReport = async (data: any) => {
  try {
    const safetyTimerReportsRef = collection(firestore, "safetyTimerReports");
    await addDoc(safetyTimerReportsRef, data);
    console.log("Safety timer report saved successfully!");
  } catch (error) {
    console.error("Error saving safety timer report:", error);
    throw error;
  }
};

const updateSOSButtonInformation = async (data: any) => {
  try {
    const sosButtonDocRef = doc(firestore, "sosButtonInfo", data.id);
    const { id, ...updateData } = data;
    await updateDoc(sosButtonDocRef, updateData);
    console.log("SOS button information updated successfully!");
  } catch (error) {
    console.error("Error updating SOS button information:", error);
    throw error;
  }
};

const updateSafetyTimerInformation = async (data: any) => {
  try {
    const safetyTimerDocRef = doc(firestore, "safetyTimerInfo", data.id);
    const { id, ...updateData } = data;
    await updateDoc(safetyTimerDocRef, updateData);
    console.log("Safety timer information updated successfully!");
  } catch (error) {
    console.error("Error updating safety timer information:", error);
    throw error;
  }
};

export {
  getSOSButtonInformation,
  getSafetyTimerInformation,
  saveSOSButtonReport,
  saveIncidentReport,
  saveSafetyTimerReport,
  updateSOSButtonInformation,
  updateSafetyTimerInformation,
};
