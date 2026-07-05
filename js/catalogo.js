const productos=[

{
nombre:"Ramo de Rosas Rojas",
imagen:"./images/Ramo-rosas.png"
},

{
nombre:"Rosas Blancas",
imagen:"./images/Rosas-blancas.png"
},

{
nombre:"Caja Floral",
imagen:"./images/Caja-Rosas.jpg"
},

{
nombre:"Girasoles",
imagen:"./images/Girasoles.png",

},

{
nombre:"Tulipanes",
imagen:"./images/Tulipanes.png"
},

{
nombre:"Arreglo Premium",
imagen:"./images/Arreglo-premium.png"
}

];

const contenedor=document.getElementById("catalogo");

function cargar(lista){

contenedor.innerHTML="";

lista.forEach(producto=>{

contenedor.innerHTML+=`

<div class="card" data-aos="zoom-in">

<img src="${producto.imagen}" alt="${producto.nombre}">

<div class="info">

<h3>${producto.nombre}</h3>


<a
class="boton"
target="_blank"
href="https://wa.me/5217442253380?text=${encodeURIComponent("Hola, me interesa el "+producto.nombre)}">

Comprar por WhatsApp

</a>

</div>

</div>

`;

});

}

cargar(productos);

document.getElementById("buscar").addEventListener("keyup",e=>{

const texto=e.target.value.toLowerCase();

const resultado=productos.filter(producto=>

producto.nombre.toLowerCase().includes(texto)

);

cargar(resultado);

});