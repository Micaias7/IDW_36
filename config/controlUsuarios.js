document.addEventListener("DOMContentLoaded", () => {
    const navLogin = document.getElementById("navLogin");
    const navLogout = document.getElementById("navLogout");

    const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

    if (usuarioLogueado) {
        // Mostrar Logout y ocultar Login
        navLogout.style.display = "block";
        navLogout.querySelector("a").textContent = `Logout`;
        navLogin.style.display = "none";

        // Evento de logout
        navLogout.querySelector("a").addEventListener("click", e => {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogueado");
            location.reload();
        });

        // Mostrar Alta de Médicos solo si es admin
        if (usuarioLogueado === "admin") {
            linkAlta.style.display = "block";
        }
    } else {
        // Mostrar Login
        navLogin.style.display = "block";
        navLogout.style.display = "none";
        linkAlta.style.display = "none";
    }
});