import { inicializarMedicos } from "../../config/inicializarLocalStorage.js";
import { eliminarMedico } from "./eliminarMedicos.js";
import { abrirModalEditarMedico } from "./editarMedicos.js";

inicializarMedicos();

// =======================
// Mostrar médicos en versión escritorio (página de inicio)
// =======================
export const mostrarMedicosEnIndex = () => {
  const contenedor = document.getElementById("medicosEscritorio");
  if (!contenedor) return;

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  contenedor.innerHTML = "";

  medicos.forEach((m) => {
    const card = document.createElement("div");
    card.className =
      "card border-3 border-success rounded-3 shadow d-flex flex-column align-items-center text-center p-3";

    card.innerHTML = `
      <h3>${m.genero} ${m.nombre} ${m.apellido}</h3>
      <img src="${m.imagen || m.imagenFinal || '../public/doctor.png'}" 
           alt="doctor" 
           class="doc img-fluid mb-2" 
           style="max-width: 160px; border-radius: 10px;">
      <p class="mb-1"><strong>Especialidad:</strong> ${m.especialidad}</p>
      <p class="small text-muted mt-2">${m.descripcion || ""}</p>
    `;

    contenedor.appendChild(card);
  });
};

// =======================
// Mostrar médicos en carrusel móvil (inicio)
// =======================
export const actualizarCarruselMovil = () => {
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  const carouselInner = document.getElementById("medicosCarouseCards");
  if (!carouselInner) return;

  carouselInner.innerHTML = "";

  medicos.forEach((m, index) => {
    const item = document.createElement("div");
    item.className = "carousel-item" + (index === 0 ? " active" : "");

    item.innerHTML = `
      <div class="card mx-auto border-3 border-success rounded-3 shadow text-center p-3" style="max-width: 18rem;">
        <img src="${m.imagen || m.imagenFinal || '../public/doctor.png'}" 
             class="doc card-img-top" 
             alt="doctor" 
             style="height:180px; object-fit:cover; border-radius:10px;">
        <div class="card-body text-center">
          <h5 class="card-title">${m.genero} ${m.nombre} ${m.apellido}</h5>
          <p class="card-text mb-1"><strong>${m.especialidad}</strong></p>
          <p class="card-text small text-muted">${m.descripcion || ""}</p>
        </div>
      </div>
    `;
    carouselInner.appendChild(item);
  });
};

// =======================
// Mostrar médicos en la página de alta de médicos
// =======================
export const mostrarMedicosEnAlta = () => {
  const tbody = document.getElementById("listaDeMedicos");
  if (!tbody) return;

  tbody.innerHTML = "";
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  medicos.forEach((m) => {
    const tr = document.createElement("tr");
tr.innerHTML = `
  <th scope="row">${m.id}</th>
  <td>${m.matricula || "-"}</td>
  <td>${m.genero} ${m.nombre} ${m.apellido}</td>
  <td>${m.especialidad || "-"}</td>
  <td>${
    m.obrasSociales && m.obrasSociales.length
      ? m.obrasSociales
          .map((id) =>
            id == 1 ? "OSDE" : id == 2 ? "PAMI" : id == 3 ? "IOMA" : "Desconocida"
          )
          .join(", ")
      : "-"
  }</td>
  <td>$${m.valorConsulta?.toFixed(2) || "-"}</td>
  <td>${m.descripcion || "-"}</td>
  <td>
    <img src="${m.imagen || m.imagenFinal || '../public/doctor.png'}" 
      alt="foto" 
      width="60" 
      class="rounded-circle border">
  </td>
  <td>
    <i class="bi bi-pencil-square text-primary" title="Editar" data-id="${m.id}" style="cursor:pointer"></i> |
    <i class="bi bi-person-x text-danger" title="Borrar" data-id="${m.id}" style="cursor:pointer"></i>
  </td>
`;

    tbody.appendChild(tr);
  });

  // Agregar eventos de edición y eliminación
  tbody.querySelectorAll(".bi-person-x").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      eliminarMedico(id);
    });
  });

  tbody.querySelectorAll(".bi-pencil-square").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      abrirModalEditarMedico(id);
    });
  });
};

// =======================
// Ejecutar al cargar la página
// =======================
mostrarMedicosEnIndex();
actualizarCarruselMovil();
