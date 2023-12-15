import {
  collection,
  getDocs,
  addDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import Papa from "papaparse";
import { Parser } from "@json2csv/plainjs";
import { db } from "./config"; // Import Firestore

const getData = async () => {
  try {
    const markers = await getDocs(collection(db, "markers"))
    return markers
  } catch (error) {
    console.error(error)
  }
};

const addMarker = async (newMarkerData) => {
  try {
    await addDoc(collection(db, "markers"), newMarkerData)
    console.log("New marker added!")
  } catch (error) {
    console.error("Error adding new marker: ", error)
  }
};

const uploadCsv = async (file) => {
  Papa.parse(file, {
    header: true,
    complete: async (results) => {
      const batch = writeBatch(db);
      const colRef = collection(db, "markers");

      results.data.forEach((row) => {
        const docRef = doc(colRef);
        batch.set(docRef, row);
      });

      await batch.commit();
    },
  });
  console.log("done!");
};

const downloadCsv = async () => {
  const querySnapshot = await getDocs(collection(db, "markers"));
  const data = querySnapshot.docs.map((doc) => doc.data());

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);

  // Trigger download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";
  link.click();
};

export { getData, addMarker, uploadCsv, downloadCsv };
