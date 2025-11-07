import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

export function inicializarAltaMedicos() {
  const formAlta = document.getElementById("altaMedicoForm");
  if (!formAlta) return;

  formAlta.addEventListener("submit", (e) => {
      e.preventDefault();

      if (formAlta.dataset.editId) return;

      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const especialidad = document.getElementById("especialidad").value.trim();
      const genero = document.querySelector('input[name="genero"]:checked')?.value || "";
      const imagen = document.getElementById("imagen").value || "../public/doctor.png";
      const id = obtenerNuevoId("ultimoIdMed");

      if (!nombre || !apellido || !especialidad) {
          alert("Nombre, apellido y especialidad son obligatorios.");
          return;
      }

      const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

      medicos.push({ id, nombre, apellido, especialidad, genero, imagenFinal: imagen });
      localStorage.setItem("medicos", JSON.stringify(medicos));

      mostrarMedicosEnAlta();
      alert("Registro exitoso");
      formAlta.reset();
  });
};
