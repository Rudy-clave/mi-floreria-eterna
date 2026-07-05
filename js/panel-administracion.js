import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
/* ELEMENTOS */
const form = document.getElementById("formulario");
const lista = document.getElementById("lista");
const total = document.getElementById("total");

const inputFile = document.getElementById("imagen");
const btnFile = document.getElementById("btnFile");
const fileName = document.getElementById("fileName");
const mensaje = document.getElementById("mensaje");
const preview = document.getElementById("preview");


/* ==========================
   MODAL EDITAR
========================== */

const modal = document.getElementById("modalEditar");
const editarNombre = document.getElementById("editarNombre");
const editarPrecio = document.getElementById("editarPrecio");
const guardarCambios = document.getElementById("guardarCambios");
const cerrarModal = document.getElementById("cerrarModal");

let productoEditando = null;







/* ABRIR FILE */
btnFile.addEventListener("click", () => {
  inputFile.click();
});

/* PREVIEW */
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

        resolve(
          canvas.toDataURL("image/jpeg", 0.55)
        );

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

        mensaje.textContent = "Comprimiendo imagen...";

        // Comprimir la imagen
        const imagenComprimida = await comprimirImagen(file);

        mensaje.textContent = "Guardando producto...";

        await addDoc(collection(db, "productos"), {

            nombre,
            precio,
            imagen: imagenComprimida

        });

        mensaje.textContent = "✅ Producto guardado";

        form.reset();

        preview.src = "";
        preview.style.display = "none";

        fileName.textContent = "Ningún archivo";

        cargar();

    } catch (error) {

        console.error(error);

        mensaje.textContent = "❌ Error al guardar";

    }

});

/* CARGAR */
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
        <img src="${p.imagen}" style="
          width:180px;
          height:180px;
          object-fit:cover;
          border-radius:12px;
        ">

        <h3>🌸 ${p.nombre}</h3>
        <p>$${p.precio}</p>
      `;

      // =========================
      // BOTÓN EDITAR (MEJORADO)
      // =========================
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️ Editar";
      btnEditar.addEventListener("click", () => editar(d.id));

      // =========================
      // BOTÓN ELIMINAR (MEJORADO)
      // =========================
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑 Eliminar";

   btnEliminar.addEventListener("click", async () => {

  const confirmar = window.confirm("¿Eliminar este producto?");

  console.log("Confirmación:", confirmar);

  if (!confirmar) return;

  try {
    btnEliminar.textContent = "Eliminando...";
    btnEliminar.disabled = true;

    await deleteDoc(doc(db, "productos", d.id));

    card.remove();

    total.textContent = Number(total.textContent) - 1;

  } catch (error) {
    console.error(error);
    alert("Error al eliminar");
    btnEliminar.textContent = "🗑 Eliminar";
    btnEliminar.disabled = false;
  }
});

      // contenedor botones
      const contBtns = document.createElement("div");
      contBtns.style.display = "flex";
      contBtns.style.gap = "10px";
      contBtns.style.marginTop = "10px";

      contBtns.appendChild(btnEditar);
      contBtns.appendChild(btnEliminar);

      card.appendChild(contBtns);
      lista.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    lista.innerHTML = "<p>Error al cargar productos</p>";
  }
}

/* ==========================
   EDITAR PRODUCTO
========================== */

window.editar = async (id) => {

    const snap = await getDocs(collection(db, "productos"));

    snap.forEach((d) => {

        if (d.id === id) {

            editarNombre.value = d.data().nombre;
            editarPrecio.value = d.data().precio;

        }

    });

    productoEditando = id;

    modal.style.display = "flex";

};



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

/* CERRAR MODAL */

cerrarModal.addEventListener("click", () => {

    modal.style.display = "none";

});


cargar();