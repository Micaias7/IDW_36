const formLogin = document.getElementById('formLogin');
const inputUsuario = document.getElementById('usuario');
const inputClave = document.getElementById('clave');
const mensaje = document.getElementById('mensaje');


function mostrarMensaje(texto, tipo = "danger") {
    mensaje.innerHTML = `
        <div class="col-md-6 col-lg-4">
            <div class="alert alert-${tipo}">${texto}</div>
        </div>
    `;
}


formLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    let usuarioIngresado = inputUsuario.value.trim();
    let claveIngresada = inputClave.value.trim();

  
    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuarioIngresado && u.clave === claveIngresada
    );

    if (usuarioEncontrado) {
        sessionStorage.setItem("usuarioLogueado", usuarioIngresado);
        mostrarMensaje("¡Bienvenido!", "success");
        window.location.href = "index.html"; 

        
    } else {
        mostrarMensaje("Usuario o contraseña incorrectos.", "danger");
    }
});