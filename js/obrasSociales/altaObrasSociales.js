import { obtenerNuevoId } from "../../config/generadorId.js";
import { mostrarObrasSociales } from "./mostrarObrasSociales.js";

export function inicializarAltaObrasSociales() {
  const form = document.getElementById("altaObraSocialForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (form.dataset.editId) return;

    const nombre = document.getElementById("nombreObraSocial").value.trim();
    const descripcion = document.getElementById("descripcionObraSocial").value.trim();
    const porcentaje = document.getElementById("porcentajeOS").value;
    
    if (!nombre || !descripcion || porcentaje === "") {
      alert("Nombre y descripción son obligatorios.");
      return;
    }

    const id = obtenerNuevoId("ultimoIdOS");
    const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];
    
    obrasSociales.push({ id, nombre, descripcion });
    localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));

    mostrarObrasSociales();
    alert("Ha sido registrada exitosamente.");
    form.reset();
  });
}