import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

// Función para eliminar médico
export function eliminarMedico(id) {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const medicoAEliminar = medicos.find(m => m.id === Number(id));
    const confirmar = confirm(`¿Seguro que querés eliminar al Dr/a. ${medicoAEliminar.nombre} ${medicoAEliminar.apellido}?`);
    if (confirmar) {
        const nuevosMedicos = medicos.filter(m => m.id !== Number(id));
        localStorage.setItem("medicos", JSON.stringify(nuevosMedicos));
        mostrarMedicosEnAlta();
    alert(`Se elimino el registro de: Dr/a. ${medicoAEliminar.nombre} ${medicoAEliminar.apellido}.`);
    };
};