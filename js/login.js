
import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const btn = document.getElementById("btnLogin");

btn.addEventListener("click", async () => {

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, correo, password);

        // Redirigir al panel correcto
        window.location.href = "panel-de-administracion.html";

    } catch (error) {

        console.error(error);

        document.getElementById("error").innerHTML =
            "Correo o contraseña incorrectos.";

    }

});