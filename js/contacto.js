<script type="module" src="js/login.js?v=2.0"></script>
document.getElementById("formContacto").addEventListener("submit", function(e){

e.preventDefault();

const nombre=document.getElementById("nombre").value;

const telefono=document.getElementById("telefono").value;

const correo=document.getElementById("correo").value;

const mensaje=document.getElementById("mensaje").value;

const texto=
`🌸 Hola, soy ${nombre}.

📞 Teléfono: ${telefono}

📧 Correo: ${correo}

📝 Mensaje:

${mensaje}`;

const url="https://wa.me/5217442253380?text="+encodeURIComponent(texto);

window.open(url,"_blank");

});