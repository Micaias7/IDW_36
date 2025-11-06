import { inicializarLocalStorageEspecialidades } from "../config/inicializarLocalStorageEspecialidades.js";

inicializarLocalStorageEspecialidades();

// Mostrar especialidades en tabla de Alta de Especialidades
export const mostrarEspecialidadesEnAlta = () => {
  const tbody = document.getElementById("listaDeEspecialidades");
  if (!tbody) return;

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

  // Asignar eventos a los botones
  document.querySelectorAll(".editar").forEach(btn =>
    btn.addEventListener("click", editarEspecialidad)
  );

  document.querySelectorAll(".borrar").forEach(btn =>
    btn.addEventListener("click", borrarEspecialidad)
  );
};

// --- Editar una especialidad ---
function editarEspecialidad(e) {
  const index = e.target.dataset.index;
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const nueva = prompt("Editar nombre de la especialidad:", especialidades[index].nombre);

  if (nueva && nueva.trim() !== "") {
    especialidades[index].nombre = nueva.trim();
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidadesEnAlta();
  }
}

// --- Borrar una especialidad ---
function borrarEspecialidad(e) {
  const index = e.target.dataset.index;
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  if (confirm(`¿Eliminar la especialidad "${especialidades[index].nombre}"?`)) {
    especialidades.splice(index, 1);
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
    mostrarEspecialidadesEnAlta();
  }
}

// Ejecutar automáticamente al cargar
document.addEventListener("DOMContentLoaded", mostrarEspecialidadesEnAlta);
