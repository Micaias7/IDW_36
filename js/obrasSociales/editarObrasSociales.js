import { mostrarObrasSociales } from "./mostrarObrasSociales.js";

export function abrirEditarObraSocial(id) {
  const confirmar = confirm("¿Ingresar en modo Edición?");
  if (!confirmar) return;

  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];
  const os = obrasSociales.find(o => o.id === Number(id));
  if (!os) return;

  const form = document.getElementById("altaObraSocialForm");
  const inputNombre = document.getElementById("nombreObraSocial");
  const inputDesc = document.getElementById("descripcionObraSocial");
  const inputPorcentaje = document.getElementById("porcentajeOS")
  const botonGuardar = document.getElementById("botonGuardarOS");
  const titulo = document.getElementById("tituloOS");
  
  inputNombre.value = os.nombre;
  inputDesc.value = os.descripcion;
  inputPorcentaje.value = os.porcentaje;
  
  form.dataset.editId = id; 
  if (botonGuardar) botonGuardar.textContent = "Actualizar Obra Social";
  if (titulo) titulo.textContent = `Editando: ${os.nombre}`;

  const onSubmitOriginal = form.onsubmit;

  form.onsubmit = (e) => {
    e.preventDefault();
    
    const idEdit = form.dataset.editId;
    if (!idEdit || idEdit !== id) return;

    const osAEditar = obrasSociales.find(o => o.id === Number(idEdit));
    if (!osAEditar) return;
    
    osAEditar.nombre = inputNombre.value.trim();
    osAEditar.descripcion = inputDesc.value.trim();
    osAEditar.porcentaje = Number(inputPorcentaje.value);

    if (!osAEditar.nombre || !osAEditar.descripcion || inputPorcentaje.value === "") {
      alert("Nombre y descripción son obligatorios.");
      return;
    }

    localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));
    
    alert("Obra Social actualizada.");

    form.reset();
    delete form.dataset.editId;
    if (botonGuardar) botonGuardar.textContent = "Registrar Obra Social";
    if (titulo) titulo.textContent = "Alta de Obras Sociales";
    
    form.onsubmit = onSubmitOriginal; 

    mostrarObrasSociales();
  };
}