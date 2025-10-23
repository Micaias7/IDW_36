import { inicializarLocalStorage } from "../config/inicializarLocalStorage.js";
import { mostrarMedicosEnAlta, mostrarMedicosEnIndex, actualizarCarruselMovil } from "./mostrarMedicos.js"

inicializarLocalStorage();

const formAlta = document.getElementById("altaMedicoForm");
if(formAlta) {
    formAlta.addEventListener("submit", (e) => {
        e.preventDefault();

        if (formAlta.dataset.editIndex !== undefined) {
            // Si hay un índice de edición, delegar a la función de edición
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const especialidad = document.getElementById("especialidad").value;
        const genero = document.querySelector('input[name="genero"]:checked')?.value || "";
        const imagen = document.getElementById("imagen").value || "../public/doctor.png";

        const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

        medicos.push({
            nombre,
            apellido,
            especialidad,
            genero,
            imagenFinal: imagen
        });

        localStorage.setItem("medicos", JSON.stringify(medicos));

        // === NUEVO: Pop-up de registro exitoso ===
        alert("Registro exitoso");

        formAlta.reset();

        mostrarMedicosEnAlta();
        mostrarMedicosEnIndex();
        actualizarCarruselMovil();
    });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarMedicosEnIndex();
    actualizarCarruselMovil();
    mostrarMedicosEnAlta();
});

