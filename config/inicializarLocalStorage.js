import { medicosIniciales } from "./medicosIniciales.js";
import { especialidadesIniciales } from "./especialidadesIniciales.js";
import { obrasSocialesIniciales } from "./obrasSocialesIniciales.js";
import { turnosIniciales } from "./turnosIniciales.js";

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

export const inicializarObrasSociales = () => {
  if (!localStorage.getItem("obrasSociales")) {
    localStorage.setItem("obrasSociales", JSON.stringify(obrasSocialesIniciales));
    
    const ultimoIdOS = 
      obrasSocialesIniciales.length > 0
      ? Math.max(...obrasSocialesIniciales.map(o => o.id))
      : 0;
    
    localStorage.setItem("ultimoIdOS", ultimoIdOS.toString());
  }
};

export const inicializarTurnos = () => {
  if (!localStorage.getItem("turnos")) {
    localStorage.setItem("turnos", JSON.stringify(turnosIniciales));
    
    const ultimoIdTurno = 
      turnosIniciales.length > 0
      ? Math.max(...turnosIniciales.map(t => t.id))
      : 0;
    
    localStorage.setItem("ultimoIdTurno", ultimoIdTurno.toString());
  }
};