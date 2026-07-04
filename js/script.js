<script type="module" src="js/login.js?v=2.0"></script>
// ===============================
// Mi Florería Eterna Eli
// script.js
// ===============================

// Animación al cargar
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Menú móvil
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("activo");
    });
}

// Animación al hacer scroll
const elementos = document.querySelectorAll(".card, section");

const mostrarElemento = () => {
    const alturaPantalla = window.innerHeight;

    elementos.forEach((elemento) => {
        const posicion = elemento.getBoundingClientRect().top;

        if (posicion < alturaPantalla - 100) {
            elemento.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", mostrarElemento);
mostrarElemento();

// Botón volver arriba
const volverArriba = document.createElement("button");

volverArriba.innerHTML = "↑";
volverArriba.className = "topButton";

document.body.appendChild(volverArriba);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        volverArriba.style.display = "block";

    } else {

        volverArriba.style.display = "none";

    }

});

volverArriba.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Año automático
const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
    `© ${new Date().getFullYear()} Mi Florería Eterna Eli - Todos los derechos reservados`;
}