import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarTurnos } from "./mostrarTurnos.js";

function cargarSelectMedicos() {
  const selectMedico = document.getElementById("turnoMedico");
  if (!selectMedico) return;
  
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  
  selectMedico.querySelectorAll("option[data-dinamico]").forEach(opt => opt.remove());

  medicos.forEach(medico => {
    const option = document.createElement("option");
    option.value = medico.id;
    option.textContent = `${medico.genero} ${medico.nombre} ${medico.apellido}`;
    option.dataset.dinamico = "true";
    selectMedico.appendChild(option);
  });
}

export function inicializarAltaTurnos() {
  const form = document.getElementById("altaTurnoForm");
  if (!form) return;

  cargarSelectMedicos();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (form.dataset.editId) return;

    const medicoId = document.getElementById("turnoMedico").value;
    const fecha = document.getElementById("turnoFecha").value;
    const hora = document.getElementById("turnoHora").value;
    const disponible = document.getElementById("turnoDisponible").checked;
    
    if (!medicoId || !fecha || !hora) {
      alert("Debe seleccionar médico, fecha y hora.");
      return;
    }

    const id = obtenerNuevoId("ultimoIdTurno");
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    
    turnos.push({ id, medicoId: Number(medicoId), fecha, hora, disponible });
    localStorage.setItem("turnos", JSON.stringify(turnos));

    mostrarTurnos();
    alert("Turno creado exitosamente.");
    form.reset();
    
    document.getElementById("turnoDisponible").checked = true;
  });
}