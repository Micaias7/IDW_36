import { mostrarObrasSociales } from "./mostrarObrasSociales.js";

export function eliminarObraSocial(id) {
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];
  const os = obrasSociales.find(o => o.id === Number(id));
  if (!os) return;

  const confirmar = confirm(`¿Seguro que querés eliminar la obra social "${os.nombre}"?`);
  
  if (confirmar) {
    const nuevasOS = obrasSociales.filter(o => o.id !== Number(id));
    localStorage.setItem("obrasSociales", JSON.stringify(nuevasOS));
    
    mostrarObrasSociales();
    alert(`Obra social "${os.nombre}" eliminada.`);
  }
}