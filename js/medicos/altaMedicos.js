import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

export function inicializarAltaMedicos() {
  const formAlta = document.getElementById("altaMedicoForm");
  if (!formAlta) return;

  formAlta.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (formAlta.dataset.editId) return;

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();
    const genero = document.querySelector('input[name="genero"]:checked')?.value || "";
    const imagenUrl = document.getElementById("imagen").value.trim();

    const archivo = document.getElementById("imagenArchivo").files[0]; 
    // <-- agregado: obtiene el archivo seleccionado desde el input "imagenArchivo" (una imagen local del usuario)

    const id = obtenerNuevoId("ultimoIdMed");

    if (!nombre || !apellido || !especialidad) {
      alert("Nombre, apellido y especialidad son obligatorios.");
      return;
    }

    let imagenFinal = "../public/doctor.png"; 
    // valor por defecto en caso de que no se cargue ninguna imagen ni se ingrese una URL

    // <-- agregado: conversión a Base64 si hay archivo seleccionado
    if (archivo) {
      // Si el usuario sube una imagen desde su computadora, se convierte a Base64 antes de guardarla
      imagenFinal = await convertirArchivoABase64(archivo);
    } else if (imagenUrl) {
      // Si no subió archivo pero ingresó una URL, se usa directamente esa URL
      imagenFinal = imagenUrl;
    }

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos.push({ id, nombre, apellido, especialidad, genero, imagenFinal });
    localStorage.setItem("medicos", JSON.stringify(medicos));

    mostrarMedicosEnAlta();
    alert("Registro exitoso");
    formAlta.reset();
  });
}

// <-- agregado: función auxiliar para convertir archivo a Base64
function convertirArchivoABase64(archivo) {
  // Esta función convierte un archivo (como una imagen seleccionada desde la computadora)
  // en una cadena de texto codificada en Base64 usando FileReader.
  // Ese formato permite guardar la imagen directamente dentro del LocalStorage.
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result); // Cuando termina de leer, devuelve la cadena Base64
    lector.onerror = (error) => reject(error); // Si hay un error en la lectura, lo captura
    lector.readAsDataURL(archivo); // Lee el archivo como "Data URL" (formato Base64)
  });
}
