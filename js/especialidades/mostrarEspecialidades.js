import { inicializarEspecialidades } from "../../config/inicializarLocalStorage.js";
import { editarEspecialidad } from "./editarEspecialidades.js";
import { borrarEspecialidad } from "./eliminarEspecialidades.js";

inicializarEspecialidades();

// Mostrar especialidades en tabla de Alta de Especialidades
export const mostrarEspecialidades = () => {
  const tbody = document.getElementById("listaDeEspecialidades");
  if (!tbody) return;

  tbody.innerHTML = "";
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

  especialidades.forEach(esp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${esp.id}</th>
      <td>${esp.nombre}</td>
      <td>
        <i class="bi bi-pencil-square text-primary editar" title="Editar" data-id="${esp.id}" style="cursor:pointer"></i> |
        <i class="bi bi-trash text-danger borrar" title="Borrar" data-id="${esp.id}" style="cursor:pointer"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Asignar eventos a botones de editar y borrar
  document.querySelectorAll(".editar").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      editarEspecialidad(id);
    })
  );

  document.querySelectorAll(".borrar").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      borrarEspecialidad(id);
    })
  );
};