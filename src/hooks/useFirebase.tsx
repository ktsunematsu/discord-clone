import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";

interface Channel {
  id: string;
  channel: DocumentData;
}

export const useFirebase = (collectionName: string) => {
  const [documents, setDocuments] = useState<Channel[]>([]);

  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData> = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const results: Channel[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({ 
          id: doc.id, 
          channel: doc.data() 
        });
      });
      setDocuments(results);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { documents };
};