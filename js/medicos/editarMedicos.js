import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

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
  const inputId = document.getElementById("idMedico");
  const inputMatricula = document.getElementById("matricula");
  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputEspecialidad = document.getElementById("especialidad");
  const inputDescripcion = document.getElementById("descripcion");
  const inputValorConsulta = document.getElementById("valorConsulta");
  const inputImagen = document.getElementById("imagen");
  const inputGenero = document.getElementsByName("genero");

  // Obras sociales
  const checkOsde = document.getElementById("osde");
  const checkPami = document.getElementById("pami");
  const checkIoma = document.getElementById("ioma");

  // --- Llenar formulario con datos existentes ---
  inputId.value = medicoAEditar.id || "";
  inputMatricula.value = medicoAEditar.matricula || "";
  inputNombre.value = medicoAEditar.nombre || "";
  inputApellido.value = medicoAEditar.apellido || "";
  inputEspecialidad.value = medicoAEditar.especialidad || "";
  inputDescripcion.value = medicoAEditar.descripcion || "";
  inputValorConsulta.value = medicoAEditar.valorConsulta || "";

  // Imagen: usar nueva o vieja propiedad
  inputImagen.value = medicoAEditar.imagen || medicoAEditar.imagenFinal || "";

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
  form.onsubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!inputNombre.value || !inputApellido.value || !inputEspecialidad.value) {
      alert("Nombre, apellido y especialidad son obligatorios.");
      return;
    }

    // Actualizar objeto en memoria
    medicoAEditar.id = Number(inputId.value);
    medicoAEditar.matricula = inputMatricula.value.trim();
    medicoAEditar.nombre = inputNombre.value.trim();
    medicoAEditar.apellido = inputApellido.value.trim();
    medicoAEditar.especialidad = inputEspecialidad.value.trim();
    medicoAEditar.genero =
      Array.from(inputGenero).find((r) => r.checked)?.value || "";
    medicoAEditar.descripcion = inputDescripcion.value.trim();
    medicoAEditar.valorConsulta = parseFloat(inputValorConsulta.value) || 0;
    medicoAEditar.imagen = inputImagen.value.trim() || "../public/doctor.png";

    // Obras sociales actualizadas
    medicoAEditar.obrasSociales = [];
    if (checkOsde.checked) medicoAEditar.obrasSociales.push(1);
    if (checkPami.checked) medicoAEditar.obrasSociales.push(2);
    if (checkIoma.checked) medicoAEditar.obrasSociales.push(3);

    // Guardar cambios en LocalStorage
    localStorage.setItem("medicos", JSON.stringify(medicos));

    // Refrescar interfaz
    mostrarMedicosEnAlta();

    // Resetear formulario y estado
    form.reset();
    delete form.dataset.editId;

    if (botonGuardar) botonGuardar.textContent = "Registrar Médico";
    if (tituloEdicion) tituloEdicion.textContent = "Alta de Médico";

    // Restaurar comportamiento original del formulario
    form.onsubmit = onSubmitOriginal;

    alert("✅ Cambios guardados correctamente.");
  };
}
