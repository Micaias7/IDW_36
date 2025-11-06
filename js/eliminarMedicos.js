import { mostrarMedicosEnAlta, mostrarMedicosEnIndex, actualizarCarruselMovil } from "./mostrarMedicos.js";

// Función para eliminar médico
export function eliminarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const confirmar = confirm(`¿Seguro que querés eliminar al Dr/a. ${medicos[index].nombre} ${medicos[index].apellido}?`);
    if (confirmar) {
        medicos.splice(index, 1);
        localStorage.setItem("medicos", JSON.stringify(medicos));
        mostrarMedicosEnAlta();
        mostrarMedicosEnIndex();
        actualizarCarruselMovil();
    }
}