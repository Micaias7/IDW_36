export const obtenerNuevoId = (clave) => {
  const ultimoId = Number(localStorage.getItem(clave)) || 0;
  const nuevoId = ultimoId + 1;
  localStorage.setItem(clave, nuevoId);
  return nuevoId;
};

// export const obtenerNuevoIdEsp = () => {
//     const ultimoIdEsp = Number(localStorage.getItem("ultimoIdEsp")) || 0;
//     const nuevoId = ultimoIdEsp + 1;
//     localStorage.setItem("ultimoIdEsp", nuevoId);
//     return nuevoId;
// };