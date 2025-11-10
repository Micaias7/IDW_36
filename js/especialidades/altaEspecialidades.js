import { mostrarEspecialidades } from "./mostrarEspecialidades.js";
import { obtenerNuevoId } from "../../config/generadorId.js";

export function inicializarAltaEspecialidades() {
  const form = document.getElementById("altaEspecialidadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (form.dataset.editId) return; // está en modo edición, delegar a editarEspecialidad

    const nombre = document.getElementById("nombreEspecialidad").value.trim();
    if (!nombre) {
      alert("El nombre de la especialidad es obligatorio.");
      return;
    };

    const id = obtenerNuevoId("ultimoIdEsp");
    const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

    especialidades.push({ id, nombre });
    localStorage.setItem("especialidades", JSON.stringify(especialidades));

    mostrarEspecialidades();
    form.reset();
    alert("Especialidad agregada correctamente.");
  });
};