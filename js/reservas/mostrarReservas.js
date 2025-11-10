import { inicializarReservas, inicializarEspecialidades, inicializarMedicos, inicializarTurnos, inicializarObrasSociales } from '../../config/inicializarLocalStorage.js';
import { eliminarReserva } from './eliminarReserva.js';

inicializarReservas();
inicializarEspecialidades();
inicializarMedicos();
inicializarTurnos();
inicializarObrasSociales();

export const mostrarReservas = () => {
  const tbody = document.getElementById("listaDeReservas");
  if (!tbody) return;

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  tbody.innerHTML = "";

  if (reservas.length === 0) {
    tbody.innerHTML = "<tr><td colspan='9'>No hay reservas registradas.</td></tr>";
    return;
  };

  reservas.forEach(reserva => {
    const turno = turnos.find(t => t.id === reserva.turnoId);    
    const medico = turno ? medicos.find(m => m.id === turno.medicoId) : null;    
    const especialidad = especialidades.find(e => e.id === reserva.especialidadId);
    const obraSocial = obrasSociales.find(os => os.id === reserva.obraSocialId);
    const paciente = `${reserva.nombre} ${reserva.apellido}`;
    const espNombre = especialidad ? especialidad.nombre : "N/A";
    const medNombre = medico ? `${medico.genero} ${medico.apellido}` : "N/A";
    const turnoInfo = turno ? `${turno.fecha} ${turno.hora}` : "Turno eliminado";
    const osNombre = obraSocial ? obraSocial.nombre : "Particular";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${reserva.id}</th>
      <td>${paciente}</td>
      <td>${reserva.dni}</td>
      <td>${espNombre}</td>
      <td>${medNombre}</td>
      <td>${turnoInfo}</td>
      <td>${osNombre}</td>
      <td>$${reserva.valorTotal}</td>
      <td>
        <i class="bi bi-trash text-danger" title="Eliminar Reserva" data-id="${reserva.id}" style="cursor:pointer"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".bi-trash").forEach(icon => {
    icon.addEventListener("click", (e) => {
      eliminarReserva(e.target.dataset.id);
    });
  });
};