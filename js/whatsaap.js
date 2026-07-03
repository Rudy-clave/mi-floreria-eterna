const productos = [

{
id:1,
nombre:"Arreglo de Girasoles",
categoria:"Girasoles",
precio:"Desde $80 MXN",
descripcion:"Arreglo artesanal elaborado completamente a mano.",
imagen:"images/girasoles1.jpg"
},

{
id:2,
nombre:"Ramo para Graduación",
categoria:"Graduación",
precio:"Desde $150 MXN",
descripcion:"Ideal para celebrar un logro especial.",
imagen:"images/graduacion1.jpg"
},

{
id:3,
nombre:"Ramo Personalizado",
categoria:"Personalizados",
precio:"$80 - $1,000 MXN",
descripcion:"El precio varía según el tamaño, diseño y extras solicitados.",
imagen:"images/personalizado1.jpg"
}

];

const contenedor = document.querySelector("#productos");

function mostrarProductos(lista){

contenedor.innerHTML="";

lista.forEach(producto=>{

contenedor.innerHTML +=`

<div class="card">

<img src="${producto.imagen}" alt="${producto.nombre}">

<div class="contenido">

<h3>${producto.nombre}</h3>

<p>${producto.descripcion}</p>

<h4>${producto.precio}</h4>

<a class="botonWhatsApp"
href="https://wa.me/527442253380?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(producto.nombre)}">

Pedir por WhatsApp

</a>

</div>

</div>

`;

});

}

mostrarProductos(productos);

const buscador=document.querySelector("#buscar");

if(buscador){

buscador.addEventListener("keyup",(e)=>{

const texto=e.target.value.toLowerCase();

const resultado=productos.filter(p=>

p.nombre.toLowerCase().includes(texto) ||

p.categoria.toLowerCase().includes(texto)

);

mostrarProductos(resultado);

});

};

{
id:4,
nombre:"Nuevo Arreglo",
categoria:"Temporada",
precio:"Desde $250 MXN",
descripcion: "Descripción del producto.",
imagen:"images/nuevo.jpg"
}