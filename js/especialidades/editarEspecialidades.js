import { mostrarEspecialidades } from "./mostrarEspecialidades.js";

export function editarEspecialidad(id) {
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const especialidadAEditar = especialidades.find(e => e.id === Number(id));

  const nueva = prompt("Editar nombre de la especialidad:", especialidadAEditar.nombre);

  if (nueva && nueva.trim() !== "") {
    especialidadAEditar.nombre = nueva.trim();
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidades();
  };
};