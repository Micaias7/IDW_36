import { inicializarObrasSociales } from "../../config/inicializarLocalStorage.js";
import { eliminarObraSocial } from "./eliminarObrasSociales.js";
import { abrirEditarObraSocial } from "./editarObrasSociales.js";

inicializarObrasSociales(); 

export const mostrarObrasSociales = () => {
  const tbody = document.getElementById("listaDeObrasSociales");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  if (obrasSociales.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No hay obras sociales registradas.</td></tr>";
    return;
  }

  obrasSociales.forEach(os => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${os.id}</th>
      <td>${os.nombre}</td>
      <td>${os.descripcion}</td>
      <td>
        <i class="bi bi-pencil-square text-primary" title="Editar" data-id="${os.id}" style="cursor:pointer"></i> |
        <i class="bi bi-trash text-danger" title="Borrar" data-id="${os.id}" style="cursor:pointer"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".bi-trash").forEach(icon => {
    icon.addEventListener("click", e => eliminarObraSocial(e.target.dataset.id));
  });
  
  tbody.querySelectorAll(".bi-pencil-square").forEach(icon => {
    icon.addEventListener("click", e => abrirEditarObraSocial(e.target.dataset.id));
  });
};