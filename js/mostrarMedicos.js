import { inicializarLocalStorage } from "../config/inicializarLocalStorage.js";
import { eliminarMedico } from "./eliminarMedicos.js"
import { abrirModalEditarMedico } from "./editarMedicos.js"

inicializarLocalStorage();

// Mostrar médicos en versión escritorio
export const mostrarMedicosEnIndex = () => {
    const contenedor = document.getElementById("medicosEscritorio");
    if (!contenedor) return;
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    contenedor.innerHTML = ""; 

    medicos.forEach(m => {
        const card = document.createElement("div");
        card.className = "card border-3 border-success rounded-3 shadow d-flex flex-column align-items-center text-center p-3";
        card.innerHTML = `
        <h3>${m.genero} ${m.nombre} ${m.apellido}</h3>
        <img src="${m.imagenFinal}" alt="doctor" class="doc img-fluid mb-2">
        <p class="mb-0">Especialidad: ${m.especialidad}</p>
        `;
        contenedor.appendChild(card);
    });
};

// Mostrar médicos en carrusel móvil
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
            <img src="${m.imagenFinal}" class="doc card-img-top" alt="doctor">
            <div class="card-body text-center">
            <h5 class="card-title">${m.genero} ${m.nombre} ${m.apellido}</h5>
            <p class="card-text">${m.especialidad}</p>
            </div>
        </div>
        `;
        carouselInner.appendChild(item);
    });
};

// Mostrar médicos en la página de alta de médicos
export const mostrarMedicosEnAlta = () => {
    const tbody = document.getElementById("listaDeMedicos");
    if (!tbody) return;
    tbody.innerHTML = "";
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    
    medicos.forEach((m, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${m.nombre} ${m.apellido}</td>
            <td>${m.especialidad}</td>
            <td>
                <i class="bi bi-pencil-square text-primary" title="Editar" data-index="${index}" style="cursor:pointer"></i> |
                <i class="bi bi-person-x text-danger" title="Borrar" data-index="${index}" style="cursor:pointer"></i>
            </td>
        `;
        tbody.appendChild(tr);
    });

    //  Agregar eventos de edición y eliminación
    tbody.querySelectorAll(".bi-person-x").forEach(icon => {
        icon.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            eliminarMedico(index);
        });
    });

    tbody.querySelectorAll(".bi-pencil-square").forEach(icon => {
        icon.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            abrirModalEditarMedico(index);
        });
    });
};

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarMedicosEnIndex();
    actualizarCarruselMovil();
    mostrarMedicosEnAlta();
});
