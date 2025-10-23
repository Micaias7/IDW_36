import { inicializarLocalStorageEspecialidades } from "../config/inicializarLocalStorageEspecialidades.js";

inicializarLocalStorageEspecialidades();

// Formulario y elementos
const formAltaEspecialidad = document.getElementById("altaEspecialidadForm");
const inputNombreEspecialidad = document.getElementById("nombreEspecialidad");

// Mostrar especialidades guardadas
function mostrarEspecialidades() {
  const tbody = document.getElementById("listaDeEspecialidades");
  tbody.innerHTML = "";

  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

  especialidades.forEach((esp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${esp.nombre}</td>
      <td>
        <i class="bi bi-pencil-square text-primary editar" title="Editar" data-index="${index}"></i> |
        <i class="bi bi-trash text-danger borrar" title="Borrar" data-index="${index}"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".editar").forEach(btn => {
    btn.addEventListener("click", editarEspecialidad);
  });

  document.querySelectorAll(".borrar").forEach(btn => {
    btn.addEventListener("click", borrarEspecialidad);
  });
}

// Alta de nueva especialidad
function altaEspecialidad(event) {
  event.preventDefault();

  const nombre = inputNombreEspecialidad.value.trim();
  if (!nombre) {
    alert("Por favor ingrese el nombre de la especialidad");
    return;
  }

  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  especialidades.push({ nombre });
  localStorage.setItem("especialidades", JSON.stringify(especialidades));

  mostrarEspecialidades();
  formAltaEspecialidad.reset();
  alert(`Especialidad "${nombre}" registrada con éxito.`);
}

function editarEspecialidad(e) {
  const index = e.target.dataset.index;
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const nueva = prompt("Editar nombre de la especialidad:", especialidades[index].nombre);
  if (nueva && nueva.trim() !== "") {
    especialidades[index].nombre = nueva.trim();
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidades();
  }
}

function borrarEspecialidad(e) {
  const index = e.target.dataset.index;
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  if (confirm(`¿Seguro que deseas eliminar la especialidad "${especialidades[index].nombre}"?`)) {
    especialidades.splice(index, 1);
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidades();
  }
}

formAltaEspecialidad.addEventListener("submit", altaEspecialidad);
document.addEventListener("DOMContentLoaded", mostrarEspecialidades);
