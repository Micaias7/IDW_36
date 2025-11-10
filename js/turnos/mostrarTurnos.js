import { inicializarTurnos } from "../../config/inicializarLocalStorage.js";
import { eliminarTurno } from "./eliminarTurnos.js";
import { editarTurno } from "./editarTurnos.js";

inicializarTurnos(); 

export const mostrarTurnos = () => {
  const tbody = document.getElementById("listaDeTurnos");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  if (turnos.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6'>No hay turnos creados en la agenda.</td></tr>";
    return;
  }

  turnos.forEach(turno => {
    const medico = medicos.find(m => m.id === turno.medicoId);
    const nombreMedico = medico 
      ? `${medico.genero} ${medico.nombre} ${medico.apellido}` 
      : "Médico no encontrado";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${turno.id}</th>
      <td>${nombreMedico}</td>
      <td>${turno.fecha}</td>
      <td>${turno.hora}</td>
      <td>${turno.disponible ? '<span class="badge bg-success">Sí</span>' : '<span class="badge bg-danger">No</span>'}</td>
      <td>
        <i class="bi bi-pencil-square text-primary" title="Editar" data-id="${turno.id}" style="cursor:pointer"></i> |
        <i class="bi bi-trash text-danger" title="Borrar" data-id="${turno.id}" style="cursor:pointer"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".bi-trash").forEach(icon => {
    icon.addEventListener("click", e => eliminarTurno(e.target.dataset.id));
  });
  
  tbody.querySelectorAll(".bi-pencil-square").forEach(icon => {
    icon.addEventListener("click", e => editarTurno(e.target.dataset.id));
  });
};