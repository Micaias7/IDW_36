import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

export function inicializarAltaMedicos() {
  const formAlta = document.getElementById("altaMedicoForm");
  if (!formAlta) return;

  formAlta.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formAlta.dataset.editId) return;

    const matricula = document.getElementById("matricula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();
    const genero = document.querySelector('input[name="genero"]:checked')?.value || "";
    const descripcion = document.getElementById("descripcion").value.trim();
    const valorConsulta = parseFloat(document.getElementById("valorConsulta").value);
    const imagen = document.getElementById("imagen").value || "../public/doctor.png";
    const id = obtenerNuevoId("ultimoIdMed");

    if (!nombre || !apellido || !especialidad || isNaN(valorConsulta)) {
      alert("Por favor, completá todos los campos obligatorios.");
      return;
    }

    const obrasSociales = [];
    if (document.getElementById("osde").checked) obrasSociales.push(1);
    if (document.getElementById("pami").checked) obrasSociales.push(2);
    if (document.getElementById("ioma").checked) obrasSociales.push(3);

    const medico = {
      id,
      nombre,
      apellido,
      especialidad,
      genero,
      matricula,
      valorConsulta,
      obrasSociales,
      descripcion,
      imagen
    };

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos.push(medico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    mostrarMedicosEnAlta();
    alert("✅ Médico registrado correctamente.");
    formAlta.reset();
  });
}

// 🟢 Ejecutar la función al cargar la página
inicializarAltaMedicos();
