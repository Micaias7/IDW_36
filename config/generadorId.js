export const obtenerNuevoId = (clave) => {
  const ultimoId = Number(localStorage.getItem(clave)) || 0;
  const nuevoId = ultimoId + 1;
  localStorage.setItem(clave, nuevoId);
  return nuevoId;
};