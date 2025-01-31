import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firestoreConfig = {
  apiKey: "AIzaSyCwhkPxKnv9Z2Zzmdt4b8sD-HJDFHP8acQ",
  authDomain: "agenda-mais.firebaseapp.com",
  projectId: "agenda-mais",
  storageBucket: "agenda-mais.firebasestorage.app",
  messagingSenderId: "562077107128",
  appId: "1:562077107128:web:b5eafd564f9c6c2628c54d",
  measurementId: "G-8QCJYN1MQM"
};

const app = initializeApp(firestoreConfig);
const analytics = getAnalytics(app);
