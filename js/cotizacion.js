document
.getElementById("formCotizacion")
.addEventListener("submit",function(e){

e.preventDefault();

const nombre=document.getElementById("nombre").value;

const telefono=document.getElementById("telefono").value;

const tipo=document.getElementById("tipo").value;

const color=document.getElementById("color").value;

const presupuesto=document.getElementById("presupuesto").value;

const fecha=document.getElementById("fecha").value;

const comentarios=document.getElementById("comentarios").value;

const mensaje=

`🌸 Hola, quiero solicitar una cotización.

👤 Nombre: ${nombre}

📞 Teléfono: ${telefono}

💐 Tipo de arreglo: ${tipo}

🌷 Color: ${color}

💰 Presupuesto: $${presupuesto}

📅 Fecha: ${fecha}

📝 Comentarios:
${comentarios}`;

const url=

"https://wa.me/5217442253380?text="+encodeURIComponent(mensaje);

window.open(url,"_blank");

});