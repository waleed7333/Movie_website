// src/utils/firebaseConfig.js

import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, // Import signOut here
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCbbdRyPdh939PmelylUgA-M7qCnVUd0Wo",
  authDomain: "nextjs-auth-project-799d5.firebaseapp.com",
  projectId: "nextjs-auth-project-799d5",
  storageBucket: "nextjs-auth-project-799d5.appspot.com",
  messagingSenderId: "927417809793",
  appId: "1:927417809793:web:34690ce9ad75ee9b5c4680",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Function to log out the current user
const logout = async () => {
  try {
    await signOut(auth)
    console.log("User successfully logged out")
  } catch (error) {
    console.error("Error logging out:", error)
    throw error
  }
}

export {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  logout,
}
