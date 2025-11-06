import { medicosIniciales } from "./medicosIniciales.js";

export const inicializarLocalStorage = () => {
  if (!localStorage.getItem("medicos")) {
    localStorage.setItem("medicos", JSON.stringify(medicosIniciales));
    console.log("LocalStorage inicializado con médicos predeterminados");
  }
};


