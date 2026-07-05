import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/* ==========================
   ELEMENTOS
========================== */
const form = document.getElementById("formulario");
const lista = document.getElementById("lista");
const total = document.getElementById("total");

const inputFile = document.getElementById("imagen");
const btnFile = document.getElementById("btnFile");
const fileName = document.getElementById("fileName");
const mensaje = document.getElementById("mensaje");
const preview = document.getElementById("preview");

/* MODAL */
const modal = document.getElementById("modalEditar");
const editarNombre = document.getElementById("editarNombre");
const editarPrecio = document.getElementById("editarPrecio");
const guardarCambios = document.getElementById("guardarCambios");
const cerrarModal = document.getElementById("cerrarModal");

let productoEditando = null;

/* ==========================
   FILE PICKER
========================== */
btnFile.addEventListener("click", () => inputFile.click());

inputFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileName.textContent = file.name;

  const reader = new FileReader();
  reader.onload = (event) => {
    preview.src = event.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

/* ==========================
   COMPRIMIR IMAGEN
========================== */
function comprimirImagen(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX = 600;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX) {
            height *= MAX / width;
            width = MAX;
          }
        } else {
          if (height > MAX) {
            width *= MAX / height;
            height = MAX;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", 0.6));
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

/* ==========================
   GUARDAR PRODUCTO
========================== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = document.getElementById("precio").value.trim();
  const file = inputFile.files[0];

  if (!nombre || !precio || !file) {
    mensaje.textContent = "⚠️ Completa todos los campos";
    return;
  }

  try {
    mensaje.textContent = "📦 Comprimiendo imagen...";

    const imagen = await comprimirImagen(file);

    mensaje.textContent = "💾 Guardando...";

    await addDoc(collection(db, "productos"), {
      nombre,
      precio,
      imagen
    });

    mensaje.textContent = "✅ Producto guardado";

    form.reset();
    preview.style.display = "none";
    fileName.textContent = "Ningún archivo";

    cargar();

  } catch (error) {
    console.error(error);
    mensaje.textContent = "❌ Error al guardar";
  }
});

/* ==========================
   CARGAR PRODUCTOS
========================== */
async function cargar() {
  try {
    const snap = await getDocs(collection(db, "productos"));

    lista.innerHTML = "";
    total.textContent = snap.size;

    snap.forEach((d) => {
      const p = d.data();

      const card = document.createElement("div");
      card.classList.add("producto");

      card.innerHTML = `
        <img src="${p.imagen}" style="width:180px;height:180px;object-fit:cover;border-radius:12px;">
        <h3>🌸 ${p.nombre}</h3>
        <p>$${p.precio}</p>
      `;

      /* BOTÓN EDITAR */
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️ Editar";
      btnEditar.addEventListener("click", () => editar(d.id));

      /* BOTÓN ELIMINAR */
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑 Eliminar";
      btnEliminar.addEventListener("click", () => eliminar(d.id));

      const acciones = document.createElement("div");
      acciones.style.display = "flex";
      acciones.style.gap = "10px";
      acciones.style.marginTop = "10px";

      acciones.appendChild(btnEditar);
      acciones.appendChild(btnEliminar);

      card.appendChild(acciones);
      lista.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    lista.innerHTML = "<p>❌ Error al cargar productos</p>";
  }
}

/* ==========================
   ELIMINAR
========================== */
async function eliminar(id) {
  if (!confirm("¿Eliminar este producto?")) return;

  await deleteDoc(doc(db, "productos", id));
  cargar();
}

/* ==========================
   EDITAR
========================== */
async function editar(id) {
  const ref = doc(db, "productos", id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    editarNombre.value = snap.data().nombre;
    editarPrecio.value = snap.data().precio;
  }

  productoEditando = id;
  modal.style.display = "flex";
}

/* ==========================
   GUARDAR CAMBIOS
========================== */
guardarCambios.addEventListener("click", async () => {
  try {
    await updateDoc(doc(db, "productos", productoEditando), {
      nombre: editarNombre.value,
      precio: editarPrecio.value
    });

    modal.style.display = "none";
    mensaje.textContent = "✅ Producto actualizado";

    cargar();

  } catch (error) {
    console.error(error);
    mensaje.textContent = "❌ Error al actualizar";
  }
});

/* ==========================
   CERRAR MODAL
========================== */
cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

/* INIT */
cargar();