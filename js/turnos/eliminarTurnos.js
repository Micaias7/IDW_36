import { mostrarTurnos } from "./mostrarTurnos.js";

export function eliminarTurno(id) {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const turno = turnos.find(t => t.id === Number(id));
  if (!turno) return;

  const confirmar = confirm(`¿Seguro que querés eliminar el turno ID: ${id}?`);
  
  if (confirmar) {
    const nuevosTurnos = turnos.filter(t => t.id !== Number(id));
    localStorage.setItem("turnos", JSON.stringify(nuevosTurnos));
    
    mostrarTurnos();
    alert(`Turno ID: ${id} eliminado.`);
  };
};