document.addEventListener("DOMContentLoaded", () => {
  const navLogin = document.getElementById("navLogin");
  const navLogout = document.getElementById("navLogout");
  const linkAltaMedicos = document.getElementById("linkAltaMedicos");
  const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
  const rol = sessionStorage.getItem("rol");

  // Función para mostrar/ocultar elementos del navbar
  function actualizarNavbar() {
    const isAdmin = usuarioLogueado === "admin" || rol === "admin";

    if (usuarioLogueado) {
      if (navLogout) navLogout.style.display = "block";
      if (navLogin) navLogin.style.display = "none";
      if (linkAltaMedicos) linkAltaMedicos.style.display = isAdmin ? "block" : "none";
    } else {
      if (navLogout) navLogout.style.display = "none";
      if (navLogin) navLogin.style.display = "block";
      if (linkAltaMedicos) linkAltaMedicos.style.display = "none";
      };
  };

    // Listener de logout
  if (navLogout) {
    const logoutLink = navLogout.querySelector("a");
    if (logoutLink) {
        logoutLink.addEventListener("click", e => {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogueado");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("rol");
            window.location.href = "login.html";
        });
    };
  };

  actualizarNavbar();
});