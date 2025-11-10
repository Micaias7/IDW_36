import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";
import { convertirArchivoABase64 } from "./../../config/convertidorBase64.js"

export function inicializarAltaMedicos() {
  const formAlta = document.getElementById("altaMedicoForm");
  if (!formAlta) return;

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
    const valorConsulta = parseFloat(document.getElementById("valorConsulta").value);
    const id = obtenerNuevoId("ultimoIdMed");

    if (!nombre || !apellido || !especialidad) {
      alert("Nombre, apellido y especialidad son obligatorios.");
      return;
    }

    // valor por defecto en caso de que no se cargue ninguna imagen ni se ingrese una URL
    let imagenFinal = "../public/doctor.png"; 
    // agregado: conversión a Base64 si hay archivo seleccionado
    if (archivo) imagenFinal = await convertirArchivoABase64(archivo);
    // Si el usuario sube una imagen desde su computadora, se convierte a Base64 antes de guardarla

    const obrasSociales = [];
    if (document.getElementById("osde").checked) obrasSociales.push(1);
    if (document.getElementById("pami").checked) obrasSociales.push(2);
    if (document.getElementById("ioma").checked) obrasSociales.push(3);

    const medico = {
      id,
      matricula,
      nombre,
      apellido,
      especialidad,
      genero,
      descripcion,
      obrasSociales,
      valorConsulta,
      imagenFinal
    };

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos.push(medico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    mostrarMedicosEnAlta();
    alert("✅ Médico registrado correctamente.");
    formAlta.reset();
  });
}
// Ejecutar la función al cargar la página
// inicializarAltaMedicos();