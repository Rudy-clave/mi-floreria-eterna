// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWBtT4_WOsVi6eE5W2yhF5gTKcLxfRtZY",
    authDomain: "my-floreria-eterna-eli.firebaseapp.com",
    projectId: "my-floreria-eterna-eli",
    storageBucket: "my-floreria-eterna-eli.firebasestorage.app",
    messagingSenderId: "406799933934",
    appId: "1:406799933934:web:56643b54b795519085eeff"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);