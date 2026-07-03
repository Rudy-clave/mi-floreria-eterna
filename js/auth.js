import { auth } from "./firebase-config.js";

import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

console.log("auth.js cargado");

onAuthStateChanged(auth, (user) => {

    console.log("usuario:", user);

    if (!user) {

        window.location.href = "login.html";

    }

});