import {initializeApp, type FirebaseApp} from 'firebase/app'
import { firebaseConfig } from './firebaseConfig';
import { getFirestore, Firestore } from 'firebase/firestore';

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore();
