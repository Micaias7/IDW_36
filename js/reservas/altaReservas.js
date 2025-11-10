import { inicializarEspecialidades } from '../../config/inicializarLocalStorage.js';
import { inicializarMedicos } from '../../config/inicializarLocalStorage.js';
import { inicializarTurnos } from '../../config/inicializarLocalStorage.js';
import { inicializarObrasSociales } from '../../config/inicializarLocalStorage.js';
import { inicializarReservas } from '../../config/inicializarLocalStorage.js';
import { obtenerNuevoId } from '../../config/generadorId.js';

inicializarEspecialidades();
inicializarMedicos();
inicializarTurnos();
inicializarObrasSociales();
inicializarReservas();

const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

const selectEspecialidad = document.getElementById("selectEspecialidad");
const selectMedico = document.getElementById("selectMedico");
const selectTurno = document.getElementById("selectTurno");
const selectObraSocial = document.getElementById("selectObraSocial");
const formReserva = document.getElementById("formReserva");
const mensajeReserva = document.getElementById("mensajeReserva");

const resumenCosto = document.getElementById("resumenCosto");
const costoBase = document.getElementById("costoBase");
const nombreDescuento = document.getElementById("nombreDescuento");
const montoDescuento = document.getElementById("montoDescuento");
const costoTotalCalculado = document.getElementById("costoTotalCalculado");

let medicoSeleccionado = null;
let turnoSeleccionado = null;
let obraSocialSeleccionada = obrasSociales.find(os => os.porcentaje === 0) || null; // por defecto es particular
let valorTotalCalculado = 0;

function cargarEspecialidades() {
  especialidades.forEach(esp => {
    const option = document.createElement("option");
    option.value = esp.id;
    option.textContent = esp.nombre;
    selectEspecialidad.appendChild(option);
  });
};

function cargarObrasSociales() {
  obrasSociales.sort((a, b) => a.nombre.localeCompare(b.nombre));
  obrasSociales.forEach(os => {
    const option = document.createElement("option");
    option.value = os.id;
    option.textContent = `${os.nombre} (${os.porcentaje}%)`;
    if (os.porcentaje === 0) {
        option.selected = true;
    }
    selectObraSocial.appendChild(option);
  });
};

// CALCULO
function actualizarCostoResumen() {
  if (!medicoSeleccionado) {
    resumenCosto.style.display = "none";
    return;
  };

  const valorConsulta = medicoSeleccionado.valorDeConsulta || 0;
  let os = obraSocialSeleccionada;

  if (!os) {
    os = { nombre: "Particular", porcentaje: 0 };
  };

  const porcentajeDto = os.porcentaje || 0;
  const montoDto = valorConsulta * (porcentajeDto / 100);
  valorTotalCalculado = valorConsulta - montoDto;

  costoBase.textContent = valorConsulta.toFixed(2);
  nombreDescuento.textContent = `${os.nombre} (${porcentajeDto}%)`;
  montoDescuento.textContent = montoDto.toFixed(2);
  costoTotalCalculado.textContent = valorTotalCalculado.toFixed(2);

  resumenCosto.style.display = "block";
};

selectEspecialidad.addEventListener("change", (e) => {
  const especialidadId = e.target.value;
  const espObj = especialidades.find(esp => esp.id == especialidadId);
  if (!espObj) return;
  const nombreEspecialidad = espObj.nombre;

  selectMedico.innerHTML = '<option value="" selected disabled>Elija un médico...</option>';
  selectTurno.innerHTML = '<option value="" selected disabled>Primero elija un médico</option>';
  selectMedico.disabled = false;
  selectTurno.disabled = true;
  medicoSeleccionado = null;
  turnoSeleccionado = null;
  actualizarCostoResumen();

  const medicosFiltrados = medicos.filter(m => m.especialidad === nombreEspecialidad);
  
  if (medicosFiltrados.length === 0) {
    selectMedico.innerHTML = '<option value="" selected disabled>No hay médicos para esta especialidad</option>';
    selectMedico.disabled = true;
    return;
  };

  medicosFiltrados.forEach(med => {
    const option = document.createElement("option");
    option.value = med.id;
    option.textContent = `${med.genero} ${med.nombre} ${med.apellido} ($${med.valorDeConsulta})`;
    selectMedico.appendChild(option);
  });
});

selectMedico.addEventListener("change", (e) => {
  const medicoId = e.target.value;
  medicoSeleccionado = medicos.find(m => m.id == medicoId);

  selectTurno.innerHTML = '<option value="" selected disabled>Elija un horario...</option>';
  selectTurno.disabled = false;
  turnoSeleccionado = null;
  
  actualizarCostoResumen();

  const turnosFiltrados = turnos.filter(t => t.medicoId == medicoId && t.disponible);

  if (turnosFiltrados.length === 0) {
    selectTurno.innerHTML = '<option value="" selected disabled>No hay turnos disponibles para este médico</option>';
    selectTurno.disabled = true;
    return;
  };

  turnosFiltrados.sort((a, b) => new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`));

  turnosFiltrados.forEach(t => {
    const option = document.createElement("option");
    option.value = t.id;
    option.textContent = `Fecha: ${t.fecha} - Hora: ${t.hora}`;
    selectTurno.appendChild(option);
  });
});

selectTurno.addEventListener("change", (e) => {
    const turnoId = e.target.value;
    turnoSeleccionado = turnos.find(t => t.id == turnoId);
});

selectObraSocial.addEventListener("change", (e) => {
    const osId = e.target.value;
    obraSocialSeleccionada = obrasSociales.find(os => os.id == osId);
    actualizarCostoResumen();
});

formReserva.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!medicoSeleccionado || !turnoSeleccionado) {
    alert("Debe seleccionar una especialidad, un médico y un turno.");
    return;
  };
  
  const dni = document.getElementById("inputDNI").value;
  const nombre = document.getElementById("inputNombre").value;
  const apellido = document.getElementById("inputApellido").value;
  const obraSocialId = selectObraSocial.value;
  const especialidadId = selectEspecialidad.value;
  const valorTotal = valorTotalCalculado;
  const id = obtenerNuevoId("ultimoIdReserva");

  const nuevaReserva = {
    id,
    dni,
    nombre,
    apellido,
    turnoId: turnoSeleccionado.id,
    especialidadId: Number(especialidadId),
    obraSocialId: Number(obraSocialId),
    valorTotal
  };

  try {
    const turnoIndex = turnos.findIndex(t => t.id === turnoSeleccionado.id);
    if (turnoIndex === -1) throw new Error("El turno seleccionado ya no existe.");
    
    turnos[turnoIndex].disponible = false;
    localStorage.setItem("turnos", JSON.stringify(turnos));

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    mostrarConfirmacion(nuevaReserva);
    formReserva.reset();
    formReserva.style.display = "none"; 
    
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    mensajeReserva.innerHTML = `<div class="alert alert-danger">Error: No se pudo completar la reserva. ${error.message}</div>`;
  };
});

function mostrarConfirmacion(reserva) {
  const esp = especialidades.find(e => e.id == reserva.especialidadId)?.nombre || "N/A";
  const med = `${medicoSeleccionado.genero} ${medicoSeleccionado.nombre} ${medicoSeleccionado.apellido}`;
  const os = obrasSociales.find(o => o.id == reserva.obraSocialId)?.nombre || "Particular";
  const turno = turnos.find(t => t.id == reserva.turnoId);

  mensajeReserva.innerHTML = `
    <div class="alert alert-success">
      <h4 class="alert-heading">¡Reserva Confirmada!</h4>
      <p>Gracias, ${reserva.nombre}. Tu turno ha sido agendado con éxito.</p>
      <hr>
      <p class="mb-1"><strong>Paciente:</strong> ${reserva.nombre} ${reserva.apellido} (DNI: ${reserva.dni})</p>
      <p class="mb-1"><strong>Médico:</strong> ${med}</p>
      <p class="mb-1"><strong>Especialidad:</strong> ${esp}</p>
      <p class="mb-1"><strong>Fecha:</strong> ${turno.fecha}</p>
      <p class="mb-1"><strong>Hora:</strong> ${turno.hora}</p>
      <p class="mb-1"><strong>Cobertura:</strong> ${os}</p>
      <p class="mb-0"><strong>Costo Final: $${reserva.valorTotal.toFixed(2)}</p>
    </div>
    <div class="text-center">
      <a href="index.html" class="btn btn-secondary">Volver al Inicio</a>
    </div>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  cargarEspecialidades();
  cargarObrasSociales();
});