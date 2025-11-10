import { medicosIniciales } from "./medicosIniciales.js";
import { especialidadesIniciales } from "./especialidadesIniciales.js";
import { obrasSocialesIniciales } from "./obrasSocialesIniciales.js";
import { turnosIniciales } from "./turnosIniciales.js";
import { reservasIniciales } from "./reservasIniciales.js";

const inicializarEntidad = (clave, datosIniciales, claveUltimoId) => {
  if (!localStorage.getItem(clave)) {
    localStorage.setItem(clave, JSON.stringify(datosIniciales));

    const ultimoId = datosIniciales.length > 0
      ? Math.max(...datosIniciales.map(e => e.id))
      : 0;

    localStorage.setItem(claveUltimoId, ultimoId.toString());
  }
};

export const inicializarMedicos = () => inicializarEntidad("medicos", medicosIniciales, "ultimoIdMed");
export const inicializarEspecialidades = () => inicializarEntidad("especialidades", especialidadesIniciales, "ultimoIdEsp");
export const inicializarObrasSociales = () => inicializarEntidad("obrasSociales", obrasSocialesIniciales, "ultimoIdOS");
export const inicializarTurnos = () => inicializarEntidad("turnos", turnosIniciales, "ultimoIdTurno");
export const inicializarReservas = () => inicializarEntidad("reservas", reservasIniciales, "ultimoIdReserva");