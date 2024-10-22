import {
  addDoc as addDocToDB,
  collection,
  doc,
  getDocs as getDocsFromDB,
  updateDoc ,
} from "firebase/firestore";
import { db } from ".";

export const addDoc = async (obj: { [key: string]: any }) => {
  try {
    const docRef = await addDocToDB(collection(db, "urls"), obj);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDocs = async () => {
  const urlsList: any[] = [];
  const querySnapshot = await getDocsFromDB(collection(db, "urls"));

  querySnapshot.forEach((doc) => {
    urlsList.push({ ...doc.data(), post_id: doc.id });
  });

  return urlsList;
};

export const updateDocument = async (docId: string, updatedData: { name: string }) => {
  // Get a reference to the document by its ID
  const docRef = doc(db, "urls", docId);

  // Update the document with new data
  await updateDoc(docRef, updatedData);
};
