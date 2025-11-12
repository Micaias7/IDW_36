import { login } from "../config/auth.js";

const formLogin = document.getElementById("formLogin");
const usuario = document.getElementById("usuario");
const clave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo){
  mensaje.innerHTML = `
    <div class="col-md-6 col-lg-4">
      <div class="alert alert-${tipo}">${texto}</div>
    </div>`
};

formLogin.addEventListener("submit", async function(event){
  event.preventDefault();

  let usuarioInput = usuario.value.trim();
  let claveInput = clave.value.trim();

  const superAdmin = usuarios.find(u => u.usuario === usuarioInput && u.clave === claveInput);
  const usuarioApi = await login(usuarioInput, claveInput);

  const usuarioValido = superAdmin || usuarioApi;
  if (!usuarioValido) {
    return alert("Error en credenciales", "danger");
  };

  const nombreUsuario = superAdmin ? superAdmin.usuario : usuarioApi.username;
  sessionStorage.setItem("usuarioLogueado", nombreUsuario);

  if (usuarioApi?.accessToken) {
    sessionStorage.setItem("token", usuarioApi.accessToken);
    try {
      const response = await fetch(`https://dummyjson.com/users/${usuarioApi.id}`);
      const userData = await response.json();
      sessionStorage.setItem("rol", userData.role);
      
    } catch (error) {
      console.error("Error al obtener el rol;", error);
    };
  };

  if (superAdmin) {
    const token = btoa(`${nombreUsuario}:${Date.now()}`)
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("rol", "admin");
  };

  const esAdmin = superAdmin?.usuario === "admin" || sessionStorage.getItem("rol") === "admin";
  window.location.href = esAdmin ? "panel.html" : "index.html";
});