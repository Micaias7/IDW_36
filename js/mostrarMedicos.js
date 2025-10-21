import { inicializarLocalStorage } from "../config/inicializarLocalStorage.js";

inicializarLocalStorage();

// Mostrar médicos en versión escritorio
export const mostrarMedicosEnIndex = () => {
    const contenedor = document.getElementById("medicosEscritorio");
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

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarMedicosEnIndex();
    actualizarCarruselMovil();
});
