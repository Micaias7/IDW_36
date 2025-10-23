import { inicializarLocalStorageEspecialidades } from "../config/inicializarLocalStorageEspecialidades.js";

inicializarLocalStorageEspecialidades();

// --- Referencias del DOM ---
const formAltaEspecialidad = document.getElementById("altaEspecialidadForm");
const inputNombreEspecialidad = document.getElementById("nombreEspecialidad");
const tbody = document.getElementById("listaDeEspecialidades");

// --- Mostrar todas las especialidades ---
function mostrarEspecialidades() {
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  tbody.innerHTML = "";

  especialidades.forEach((esp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${esp.nombre}</td>
      <td>
        <i class="bi bi-pencil-square text-primary editar" title="Editar" data-index="${index}" style="cursor:pointer;"></i> |
        <i class="bi bi-trash text-danger borrar" title="Borrar" data-index="${index}" style="cursor:pointer;"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Asignar eventos
  document.querySelectorAll(".editar").forEach(btn => btn.addEventListener("click", editarEspecialidad));
  document.querySelectorAll(".borrar").forEach(btn => btn.addEventListener("click", borrarEspecialidad));
}

// --- Agregar nueva especialidad ---
function altaEspecialidad(e) {
  e.preventDefault();

  const nombre = inputNombreEspecialidad.value.trim();
  if (!nombre) {
    alert("Por favor ingrese el nombre de la especialidad");
    return;
  }

  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  especialidades.push({ nombre });
  localStorage.setItem("especialidades", JSON.stringify(especialidades));

  formAltaEspecialidad.reset();
  mostrarEspecialidades();
  alert(`Especialidad "${nombre}" registrada con éxito.`);
}

// --- Editar ---
function editarEspecialidad(e) {
  const index = e.target.dataset.index;
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const nombreActual = especialidades[index].nombre;

  const nuevoNombre = prompt("Editar nombre de la especialidad:", nombreActual);
  if (nuevoNombre && nuevoNombre.trim() !== "") {
    especialidades[index].nombre = nuevoNombre.trim();
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidades();
    alert(`Especialidad actualizada a "${nuevoNombre}".`);
  }
}

// --- Borrar ---
function borrarEspecialidad(e) {
  const index = e.target.dataset.index;
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const nombre = especialidades[index].nombre;

  if (confirm(`¿Seguro que deseas eliminar la especialidad "${nombre}"?`)) {
    especialidades.splice(index, 1);
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidades();
    alert(`Especialidad "${nombre}" eliminada.`);
  }
}

// --- Eventos ---
formAltaEspecialidad.addEventListener("submit", altaEspecialidad);
document.addEventListener("DOMContentLoaded", mostrarEspecialidades);
