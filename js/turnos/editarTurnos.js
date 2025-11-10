import { mostrarTurnos } from "./mostrarTurnos.js";

export function editarTurno(id) {
  const confirmar = confirm("¿Ingresar en modo Edición?");
  if (!confirmar) return;

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const turno = turnos.find(t => t.id === Number(id));
  if (!turno) return;

  const form = document.getElementById("altaTurnoForm");
  const selectMedico = document.getElementById("turnoMedico");
  const inputFecha = document.getElementById("turnoFecha");
  const inputHora = document.getElementById("turnoHora");
  const checkDisp = document.getElementById("turnoDisponible");
  const botonGuardar = document.getElementById("botonGuardarTurno");
  const titulo = document.getElementById("tituloTurno");
  
  selectMedico.value = turno.medicoId;
  inputFecha.value = turno.fecha;
  inputHora.value = turno.hora;
  checkDisp.checked = turno.disponible;
  
  form.dataset.editId = id; 
  if (botonGuardar) botonGuardar.textContent = "Actualizar Turno";
  if (titulo) titulo.textContent = `Editando Turno ID: ${id}`;

  const onSubmitOriginal = form.onsubmit;

  form.onsubmit = (e) => {
    e.preventDefault();
    
    const idEdit = form.dataset.editId;
    if (!idEdit || idEdit !== id) return; 

    const turnoAEditar = turnos.find(t => t.id === Number(idEdit));
    if (!turnoAEditar) return;
    
    turnoAEditar.medicoId = Number(selectMedico.value);
    turnoAEditar.fecha = inputFecha.value;
    turnoAEditar.hora = inputHora.value;
    turnoAEditar.disponible = checkDisp.checked;

    if (!turnoAEditar.medicoId || !turnoAEditar.fecha || !turnoAEditar.hora) {
      alert("Debe seleccionar médico, fecha y hora.");
      return;
    }

    localStorage.setItem("turnos", JSON.stringify(turnos));
    alert("Turno actualizado.");
    
    form.reset();
    checkDisp.checked = true;
    delete form.dataset.editId;
    if (botonGuardar) botonGuardar.textContent = "Crear Turno";
    if (titulo) titulo.textContent = "Alta de Agenda de Turnos";
    
    form.onsubmit = onSubmitOriginal; 
    mostrarTurnos();
  };
}