const flores = [
{
    nombre:"Ramo de Rosas",
    imagen:"images/Ramo-rosas.png",
    categoria:"rosas"
},
{
    nombre:"Rosas Blancas",
    imagen:"images/Rosas-blancas.png",
    categoria:"rosas"
},
{
    nombre:"Arreglo Elegante",
    imagen:"images/Arreglo-elegante.png",
    categoria:"elegante"
},
{
    nombre:"Flores Primavera",
    imagen:"images/Flores-primavera.png",
    categoria:"primavera"
},
{
    nombre:"Caja de Rosas",
    imagen:"images/Caja-Rosas.jpg",
    categoria:"rosas"
},
{
    nombre:"Ramo Romántico",
    imagen:"images/Ramo-romantico.png",
    categoria:"premium"
},
{
    nombre:"Girasoles",
    imagen:"images/Girasoles.png",
    categoria:"primavera"
},
{
    nombre:"Tulipanes",
    imagen:"images/Tulipanes.png",
    categoria:"premium"
}
];

const galeria = document.getElementById("galeria");
const buscar = document.getElementById("buscar");
const categoria = document.getElementById("categoria"); // puede ser null

function cargar(lista){

    if (!galeria) return;

    galeria.innerHTML = "";

    lista.forEach((flor, i) => {

        galeria.innerHTML += `
            <div class="card">
                <img src="${flor.imagen}" loading="lazy">
                <h3>${flor.nombre}</h3>
            </div>
        `;

    });

    activar();
}

function activar(){

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, i) => {

        card.onclick = () => {

            const visor = document.getElementById("visor");
            const img = document.getElementById("imagenGrande");
            const titulo = document.getElementById("titulo");

            if (!visor || !img || !titulo) return;

            visor.style.display = "flex";
            img.src = flores[i].imagen;
            titulo.textContent = flores[i].nombre;
        };

    });

}

/* ===== FILTROS ===== */

function filtrar(){

    if (!buscar) return;

    let texto = buscar.value.toLowerCase();

    let cat = categoria ? categoria.value : "todos";

    let resultado = flores.filter(f => {

        let coincideTexto = f.nombre.toLowerCase().includes(texto);
        let coincideCat = (cat === "todos" || f.categoria === cat);

        return coincideTexto && coincideCat;
    });

    cargar(resultado);
}

/* eventos seguros */
if (buscar) buscar.addEventListener("input", filtrar);
if (categoria) categoria.addEventListener("change", filtrar);

/* cerrar modal */
const cerrar = document.getElementById("cerrar");

if (cerrar) {
    cerrar.onclick = () => {
        const visor = document.getElementById("visor");
        if (visor) visor.style.display = "none";
    };
}

/* init */
cargar(flores);