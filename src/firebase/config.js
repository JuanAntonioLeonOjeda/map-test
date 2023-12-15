import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4abiSt3pxCltq96naJ3uzC8xjC36cYKg",
  authDomain: "test-streamlit-f7df0.firebaseapp.com",
  projectId: "test-streamlit-f7df0",
  storageBucket: "test-streamlit-f7df0.appspot.com",
  messagingSenderId: "627299309147",
  appId: "1:627299309147:web:86775995888bcf6c64517e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
