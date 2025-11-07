import { mostrarEspecialidades } from "./mostrarEspecialidades.js";

export function borrarEspecialidad(id) {
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const especialidadAEliminar = especialidades.find(m => m.id === Number(id));

  if (confirm(`¿Seguro que deseas eliminar la especialidad "${especialidadAEliminar.nombre}"?`)) {
    const nuevasEsp = especialidades.filter(m => m.id !== Number(id));
    localStorage.setItem("especialidades", JSON.stringify(nuevasEsp));
    mostrarEspecialidades();
    alert(`Especialidad "${especialidadAEliminar.nombre}" eliminada.`);
  };
};