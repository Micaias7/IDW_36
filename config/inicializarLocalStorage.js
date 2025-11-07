import { medicosIniciales } from "./medicosIniciales.js";
import { especialidadesIniciales } from "./especialidadesIniciales.js";

export const inicializarMedicos = () => {
  if (!localStorage.getItem("medicos")) {
    localStorage.setItem("medicos", JSON.stringify(medicosIniciales));

    // Si el array está vacío, el último ID será 0
    const ultimoId =
      medicosIniciales.length > 0
        ? Math.max(...medicosIniciales.map(m => m.id))
        : 0;

    localStorage.setItem("ultimoIdMed", ultimoId.toString());
  }
};

export const inicializarEspecialidades = () => {
  if (!localStorage.getItem("especialidades")) {
    localStorage.setItem("especialidades", JSON.stringify(especialidadesIniciales));

    const ultimoIdEsp =
      especialidadesIniciales.length > 0
        ? Math.max(...especialidadesIniciales.map(e => e.id))
        : 0;

    localStorage.setItem("ultimoIdEsp", ultimoIdEsp.toString());
  }
};