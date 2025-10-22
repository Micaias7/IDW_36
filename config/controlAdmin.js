document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
    const linkAlta = document.getElementById("linkAltaMedicos");

    if (usuarioLogueado === "admin") {
        linkAlta.classList.remove("d-none"); // muestra el link solo si es admin
    }
});