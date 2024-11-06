import { firestore } from "../../config/firebase.config";
import { collection, addDoc } from "firebase/firestore";

const saveIncidentReport = async (data: {}) => {
  try {
    const incidentsRef = collection(firestore, "incidentReports");
    await addDoc(incidentsRef, data);
    console.log("Incident report saved successfully!");
  } catch (error) {
    console.error("Error saving incident report:", error);
    throw error;
  }
};

export default saveIncidentReport;
