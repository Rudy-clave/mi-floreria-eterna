import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnLogin");

    if (!btn) {
        console.log("No existe btnLogin en esta página");
        return;
    }

    btn.addEventListener("click", async () => {

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;

        try {
            await signInWithEmailAndPassword(auth, correo, password);
            window.location.href = "panel-de-administracion.html";
        } catch (error) {
            document.getElementById("error").textContent =
                "Correo o contraseña incorrectos.";
        }

    });

});