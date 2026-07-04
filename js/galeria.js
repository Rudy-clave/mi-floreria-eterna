const flores=[

{

nombre:"Ramo de Rosas",

imagen:"images/Ramo-rosas.png"

},

{

nombre:"Rosas Blancas",

imagen:"images/Rosas-blancas.png"

},

{

nombre:"Arreglo Elegante",

imagen:"images/Arreglo-elegante.png"

},

{

nombre:"Flores Primavera",

imagen:"images/Flores-primavera.png"

},

{

nombre:"Caja de Rosas",

imagen:"images/Caja-rosas.jpg"

},

{

nombre:"Ramo Romántico",

imagen:"images/Ramo-romantico.png"

},

{

nombre:"Girasoles",

imagen:"images/Girasoles.png"

},

{

nombre:"Tulipanes",

imagen:"images/Tulipanes.png"

}

];

const galeria=document.getElementById("galeria");

function cargar(lista){

galeria.innerHTML="";

lista.forEach(flor=>{

galeria.innerHTML+=`

<div class="card">

<img src="${flor.imagen}">

<h3>${flor.nombre}</h3>

</div>

`;

});

activar();

}

cargar(flores);

function activar(){

const cards=document.querySelectorAll(".card");

cards.forEach((card,i)=>{

card.onclick=()=>{

document.getElementById("visor").style.display="flex";

document.getElementById("imagenGrande").src=flores[i].imagen;

document.getElementById("titulo").innerHTML=flores[i].nombre;

}

});

}

document.getElementById("cerrar").onclick=()=>{

document.getElementById("visor").style.display="none";

}

document.getElementById("buscar").addEventListener("keyup",e=>{

let texto=e.target.value.toLowerCase();

let resultado=flores.filter(f=>

f.nombre.toLowerCase().includes(texto)

);

cargar(resultado);

});