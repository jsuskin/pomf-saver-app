import {
  addDoc as addDocToDB,
  collection,
  doc,
  getDocs as getDocsFromDB,
  updateDoc ,
} from "firebase/firestore";
import { db } from ".";

export const addDoc = async (collectionName: string, obj: { [key: string]: any }) => {
  try {
    const docRef = await addDocToDB(collection(db, collectionName), obj);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDocs = async (collectionName: string) => {
  const docs: any[] = [];
  const querySnapshot = await getDocsFromDB(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), post_id: doc.id });
  });

  return docs;
};

export const updateDocument = async (collectionName: string, docId: string, updatedData: { name: string }) => {
  // Get a reference to the document by its ID
  const docRef = doc(db, collectionName, docId);

  // Update the document with new data
  await updateDoc(docRef, updatedData);
};
