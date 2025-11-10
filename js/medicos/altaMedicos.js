import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";
import { convertirArchivoABase64 } from "./../../config/convertidorBase64.js"

export const cargarObrasSocialesCheckBox = () => {
  const contenedor = document.getElementById("contenedorObrasSociales");
  if (!contenedor) return;

  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];

  contenedor.innerHTML = "";

  obrasSociales.forEach((os) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="os-${os.id}" value="${os.id}">
        <label class="form-check-label" for="os-${os.id}">${os.nombre}</label>
      </div>
    `;
    contenedor.appendChild(div);
  });
};

export function cargarSelectEspecialidades() {
  const select = document.getElementById("especialidad");
  if (!select) return;

  const especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  // Limpia el contenido previo
  select.innerHTML = `<option value="">Seleccione una especialidad</option>`;

  especialidades.forEach((esp) => {
    const option = document.createElement("option");
    option.value = esp.nombre;
    option.textContent = esp.nombre;
    select.appendChild(option);
  });
};

export function inicializarAltaMedicos() {
  const formAlta = document.getElementById("altaMedicoForm");
  if (!formAlta) return;
  
  cargarObrasSocialesCheckBox();
  cargarSelectEspecialidades();

  formAlta.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (formAlta.dataset.editId) return;
    
    const matricula = document.getElementById("matricula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();
    const genero = document.querySelector('input[name="genero"]:checked')?.value || "";
    const archivo = document.getElementById("imagenArchivo").files[0]; 
    // <-- agregado: obtiene el archivo seleccionado desde el input "imagenArchivo" (una imagen local del usuario)
    const descripcion = document.getElementById("descripcion").value.trim();
    const valorDeConsulta = parseFloat(document.getElementById("valorConsulta").value);
    const id = obtenerNuevoId("ultimoIdMed");

    if (!nombre || !apellido || !especialidad) {
      alert("Nombre, apellido y especialidad son obligatorios.");
      return;
    };

    // valor por defecto en caso de que no se cargue ninguna imagen ni se ingrese una URL
    let imagenFinal = "../public/doctor.png"; 
    // agregado: conversión a Base64 si hay archivo seleccionado
    if (archivo) imagenFinal = await convertirArchivoABase64(archivo);
    // Si el usuario sube una imagen desde su computadora, se convierte a Base64 antes de guardarla

    const obrasSociales = 
      Array.from(document.querySelectorAll("#contenedorObrasSociales input[type='checkbox']:checked")).map(chk => parseInt(chk.value));

    const medico = {
      id,
      nombre,
      apellido,
      especialidad,
      genero,
      matricula,
      valorDeConsulta,
      obrasSociales,
      descripcion,
      imagenFinal
    };

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos.push(medico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    mostrarMedicosEnAlta();
    alert("✅ Médico registrado correctamente.");
    formAlta.reset();
  });
};