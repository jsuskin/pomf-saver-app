import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc as addDocToDB,
  getDocs as getDocsFromDB,
} from "firebase/firestore";
import app from ".";

export const db = getFirestore(app);

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
