document.addEventListener("DOMContentLoaded", () => {
    const navLogin = document.getElementById("navLogin");
    const navLogout = document.getElementById("navLogout");
    const linkAltaMedicos = document.getElementById("linkAltaMedicos");

    const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

    if (usuarioLogueado) {
        // Mostrar Logout y ocultar Login
        navLogout.style.display = "block";
        navLogout.querySelector("a").textContent = `Cerrar Sesion`;
        navLogin.style.display = "none";

        // Evento de logout
        navLogout.querySelector("a").addEventListener("click", e => {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogueado");
            location.reload();
        });

        // Mostrar Alta de Médicos solo si es admin
        if (usuarioLogueado === "admin") {
            linkAltaMedicos.style.display = "block";
        }
    } else {
        // Mostrar Login
        navLogin.style.display = "block";
        navLogout.style.display = "none";
        linkAltaMedicos.style.display = "none";
    }
});