import { especialidadesIniciales } from "./especialidadesIniciales.js";


export const inicializarLocalStorageEspecialidades = () => {
  if (!localStorage.getItem("especialidades")) {
    localStorage.setItem("especialidades", JSON.stringify(especialidadesIniciales));
    console.log("LocalStorage inicializado con especialidades predeterminadas");
  }
};
