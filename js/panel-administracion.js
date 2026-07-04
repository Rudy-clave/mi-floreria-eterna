<script type="module" src="js/login.js?v=2.0"></script>
import { db, storage } from "./js/firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

/* ELEMENTOS */
const form = document.getElementById("formulario");
const lista = document.getElementById("carrusel");
const total = document.getElementById("total");
const inputFile = document.getElementById("imagen");
const btnFile = document.getElementById("btnFile");
const fileName = document.getElementById("fileName");
const mensaje = document.getElementById("mensaje");

/* BOTÓN FILE */
btnFile.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  fileName.textContent =
    inputFile.files[0]?.name || "Ningún archivo";
});

/* GUARDAR */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = document.getElementById("precio").value.trim();
  const file = inputFile.files[0];

  if (!nombre || !precio) {
    mensaje.innerText = "⚠️ Completa los campos";
    return;
  }

  if (!file) {
    mensaje.innerText = "⚠️ Selecciona una imagen";
    return;
  }

  try {
    mensaje.innerText = "⏳ Subiendo imagen...";

    const storageRef = ref(
      storage,
      `productos/${Date.now()}_${file.name}`
    );

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "productos"), {
      nombre,
      precio,
      imagen: url
    });

    mensaje.innerText = "✔ Guardado correctamente";

    form.reset();
    fileName.textContent = "Ningún archivo";

    cargar();

  } catch (error) {
    console.error(error);
    mensaje.innerText = "❌ Error al subir";
  }
});

/* CARGAR */
async function cargar() {
  try {
    const data = await getDocs(collection(db, "productos"));

    lista.innerHTML = "";
    total.innerText = data.size;

    data.forEach((d) => {
      const p = d.data();

      lista.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}">
          <h3>${p.nombre}</h3>
          <p>$${p.precio}</p>
          <button onclick="eliminar('${d.id}')">Eliminar</button>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    lista.innerHTML = "<p>Error al cargar productos</p>";
  }
}

/* ELIMINAR */
window.eliminar = async (id) => {
  await deleteDoc(doc(db, "productos", id));
  cargar();
};

cargar();