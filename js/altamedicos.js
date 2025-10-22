import { MEDICOS_INICIALES } from "./data.js";

const formAltaMedicos = document.getElementById("formMedico");
const inputNombre = document.getElementById("nombre");
const inputEspecialidad = document.getElementById("especialidad");
const inputObraSocial = document.getElementById("obraSocial");

// ----- FUNCIÓN: Alta de médicos -----
function altaMedicos(event) {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const especialidad = inputEspecialidad.value.trim();
  const obraSocial = inputObraSocial.value.trim();

  if (!nombre || !especialidad || !obraSocial) {
    alert("Completá todos los campos");
    return;
  }

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  const nuevoMedico = {
    id: Date.now(),
    nombre,
    especialidad,
    obraSocial,
  };

  medicos.push(nuevoMedico);
  localStorage.setItem("medicos", JSON.stringify(medicos));

  alert("Médico agregado correctamente ✅");
  formAltaMedicos.reset();
  mostrarMedicos();
}

formAltaMedicos.addEventListener("submit", altaMedicos);

// ----- FUNCIÓN: Mostrar médicos -----
function mostrarMedicos() {
  const tablaBody = document.querySelector("#tablaMedicos tbody");
  tablaBody.innerHTML = "";

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  medicos.forEach((medico) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${medico.id}</td>
      <td>${medico.nombre}</td>
      <td>${medico.especialidad}</td>
      <td>${medico.obraSocial}</td>
      <td>
        <button class="btn btn-warning btn-sm editar" data-id="${medico.id}">Editar</button>
        <button class="btn btn-danger btn-sm eliminar" data-id="${medico.id}">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });

  // Botones eliminar
  document.querySelectorAll(".eliminar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idAEliminar = Number(e.target.getAttribute("data-id"));
      eliminarMedico(idAEliminar);
    });
  });

  // Botones editar
  document.querySelectorAll(".editar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idAEditar = Number(e.target.getAttribute("data-id"));
      editarMedico(idAEditar);
    });
  });
}

// ----- FUNCIÓN: Eliminar médico -----
function eliminarMedico(id) {
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  if (!confirm("¿Estás seguro de eliminar este médico?")) return;

  const nuevosMedicos = medicos.filter((m) => m.id !== id);
  localStorage.setItem("medicos", JSON.stringify(nuevosMedicos));
  mostrarMedicos();
}

// ----- FUNCIÓN: Editar médico -----
function editarMedico(id) {
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  const medico = medicos.find((m) => m.id === id);
  if (!medico) return;

  // Completa el formulario con los datos actuales
  inputNombre.value = medico.nombre;
  inputEspecialidad.value = medico.especialidad;
  inputObraSocial.value = medico.obraSocial;

  const btnGuardar = document.querySelector("button[type='submit']");
  btnGuardar.textContent = "Actualizar";

  // Reemplaza el evento submit temporalmente
  formAltaMedicos.onsubmit = (event) => {
    event.preventDefault();

    medico.nombre = inputNombre.value.trim();
    medico.especialidad = inputEspecialidad.value.trim();
    medico.obraSocial = inputObraSocial.value.trim();

    localStorage.setItem("medicos", JSON.stringify(medicos));
    mostrarMedicos();

    alert("Médico actualizado correctamente ✅");

    formAltaMedicos.reset();
    btnGuardar.textContent = "Guardar";
    formAltaMedicos.onsubmit = altaMedicos; // volver a modo alta
  };
}

// ----- Inicializar -----
document.addEventListener("DOMContentLoaded", mostrarMedicos);
