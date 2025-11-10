import { mostrarReservas } from "./mostrarReservas";

export function eliminarReserva(id) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const reservaEliminada = reservas.find(r => r.id === Number(id));
  
  if (!reservaEliminada) {
    alert("No se encontró la reserva.");
    return;
  }

  if (confirm(`¿Seguro que querés eliminar la reserva de ${reservaEliminada.nombre} ${reservaEliminada.apellido}?`)) {
    
    const nuevasReservas = reservas.filter(r => r.id !== Number(id));
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));

    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const turnoAsociado = turnos.find(t => t.id === reservaEliminada.turnoId);
    
    if (turnoAsociado) {
      turnoAsociado.disponible = true;
      localStorage.setItem("turnos", JSON.stringify(turnos));
    };

    mostrarReservas();
    alert("Reserva eliminada. El turno ha sido liberado.");
  };
};