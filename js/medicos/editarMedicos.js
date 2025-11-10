import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";
import { convertirArchivoABase64 } from "../../config/convertidorBase64.js"

export function abrirModalEditarMedico(id) {
  const confirmar = confirm(`¿Ingresar en modo Edición?`);
  if (!confirmar) return;

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  const medicoAEditar = medicos.find((m) => m.id === Number(id));
  if (!medicoAEditar) {
    alert("❌ Médico no encontrado.");
    return;
  }

  const form = document.getElementById("altaMedicoForm");
  // --- Obtener los campos ---
  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputEspecialidad = document.getElementById("especialidad");
  const inputGenero = document.getElementsByName("genero");
  const inputMatricula = document.getElementById("matricula");
  const inputDescripcion = document.getElementById("descripcion");
  const inputValorConsulta = document.getElementById("valorConsulta");

  // Obras sociales
  const checkOsde = document.getElementById("osde");
  const checkPami = document.getElementById("pami");
  const checkIoma = document.getElementById("ioma");

    // Llenar formulario con datos existentes
  inputNombre.value = medicoAEditar.nombre || "";
  inputApellido.value = medicoAEditar.apellido || "";
  inputEspecialidad.value = medicoAEditar.especialidad || "";
  inputMatricula.value = medicoAEditar.matricula || "";
  inputDescripcion.value = medicoAEditar.descripcion || "";
  inputValorConsulta.value = medicoAEditar.valorConsulta || "";
  // Género
  Array.from(inputGenero).forEach(
    (radio) => (radio.checked = radio.value === medicoAEditar.genero)
  );

  // Obras sociales (IDs numéricos)
  checkOsde.checked = medicoAEditar.obrasSociales?.includes(1);
  checkPami.checked = medicoAEditar.obrasSociales?.includes(2);
  checkIoma.checked = medicoAEditar.obrasSociales?.includes(3);

  // --- Cambiar interfaz ---
  const botonGuardar = document.getElementById("botonGuardarAlta");
  const tituloEdicion = document.getElementById("titulo");

  if (botonGuardar) botonGuardar.textContent = "Guardar Cambios";
  if (tituloEdicion) tituloEdicion.textContent = "Edición de Médico";
  
  form.dataset.editId = id;
  
  const onSubmitOriginal = form.onsubmit;
  
  // --- Sobrescribir comportamiento del submit temporalmente ---    
  form.onsubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!inputNombre.value || !inputApellido.value || !inputEspecialidad.value) {
      alert("Nombre, apellido y especialidad son obligatorios.");
      return;
    }

    // Actualizar objeto en memoria
    medicoAEditar.nombre = inputNombre.value.trim();
    medicoAEditar.apellido = inputApellido.value.trim();
    medicoAEditar.especialidad = inputEspecialidad.value.trim();
    medicoAEditar.genero = Array.from(inputGenero).find((r) => r.checked)?.value || "";
    medicoAEditar.matricula = inputMatricula.value.trim();
    medicoAEditar.valorConsulta = parseFloat(inputValorConsulta.value) || 0;
    medicoAEditar.descripcion = inputDescripcion.value.trim();

    let imagenFinalNueva = medicoAEditar.imagenFinal;    
    const archivo = document.getElementById("imagenArchivo").files[0];
    if (archivo) {
      imagenFinalNueva = await convertirArchivoABase64(archivo);
    };
    medicoAEditar.imagenFinal = imagenFinalNueva;
    
    // Obras sociales actualizadas
    medicoAEditar.obrasSociales = [];
    if (checkOsde.checked) medicoAEditar.obrasSociales.push(1);
    if (checkPami.checked) medicoAEditar.obrasSociales.push(2);
    if (checkIoma.checked) medicoAEditar.obrasSociales.push(3);

    localStorage.setItem("medicos", JSON.stringify(medicos));
    alert("✅ Cambios guardados correctamente.");

    // Refrescar interfaz
    mostrarMedicosEnAlta();

    // Resetear formulario y estado
    form.reset();
    delete form.dataset.editId;

    if (botonGuardar) botonGuardar.textContent = "Registrar Médico";
    if (tituloEdicion) tituloEdicion.textContent = "Alta de Médico";

    // Restaurar comportamiento original del formulario
    form.onsubmit = onSubmitOriginal;
  };
};