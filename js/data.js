// js/data.js
export const MEDICOS_INICIALES = [
  { id: 1, nombre: "Dr. Aurelio Batista", especialidad: "Neurología", obraSocial: "OSDE" },
  { id: 2, nombre: "Dra. Catalina Fernández", especialidad: "Traumatología", obraSocial: "Swiss Medical" },
  { id: 3, nombre: "Dr. Ramiro López", especialidad: "Gastroenterología", obraSocial: "PAMI" }
];

// Si no hay médicos guardados, inicializa LocalStorage con los de ejemplo
if (!localStorage.getItem("medicos")) {
  localStorage.setItem("medicos", JSON.stringify(MEDICOS_INICIALES));
}
