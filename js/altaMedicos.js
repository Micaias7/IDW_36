import { inicializarLocalStorage } from "../config/inicializarLocalStorage.js";

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

    // Eventos de eliminar
    tbody.querySelectorAll(".bi-person-x").forEach(icon => {
        icon.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            eliminarMedico(index);
        });
    });

    // Eventos de editar
    tbody.querySelectorAll(".bi-pencil-square").forEach(icon => {
        icon.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            abrirModalEditarMedico(index);
        });
    });
};

// Función para eliminar médico
function eliminarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const confirmar = confirm(`¿Seguro que querés eliminar al Dr/a. ${medicos[index].nombre} ${medicos[index].apellido}?`);
    if (confirmar) {
        medicos.splice(index, 1);
        localStorage.setItem("medicos", JSON.stringify(medicos));
        mostrarMedicosEnAlta();
        mostrarMedicosEnIndex();
        actualizarCarruselMovil();
    }
}

// Función para abrir modal con formulario de alta para editar
function abrirModalEditarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const medico = medicos[index];

    // Obtener los campos del formulario de alta
    const form = document.getElementById("altaMedicoForm");
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputEspecialidad = document.getElementById("especialidad");
    const inputImagen = document.getElementById("imagen");
    const inputGenero = document.getElementsByName("genero");

    // Llenar formulario con los datos existentes
    inputNombre.value = medico.nombre;
    inputApellido.value = medico.apellido;
    inputEspecialidad.value = medico.especialidad;
    inputImagen.value = medico.imagenFinal;
    if(inputGenero) {
        inputGenero.forEach(radio => {
            if(radio.value === medico.genero) radio.checked = true;
        });
    }

    // Cambiar el submit del formulario para guardar cambios
    const botonGuardar = document.getElementById("botonGuardarAlta");
    if(botonGuardar) botonGuardar.textContent = "Guardar Cambios";

    const onSubmitOriginal = form.onsubmit;

    form.onsubmit = (e) => {
        e.preventDefault();

        medico.nombre = inputNombre.value;
        medico.apellido = inputApellido.value;
        medico.especialidad = inputEspecialidad.value;
        medico.imagenFinal = inputImagen.value;
        if(inputGenero) medico.genero = Array.from(inputGenero).find(r => r.checked)?.value;

        const medicosActualizados = JSON.parse(localStorage.getItem("medicos")) || [];
        medicosActualizados[index] = medico;
        localStorage.setItem("medicos", JSON.stringify(medicosActualizados));

        mostrarMedicosEnAlta();
        mostrarMedicosEnIndex();
        actualizarCarruselMovil();

        form.reset();
        if(botonGuardar) botonGuardar.textContent = "Agregar Médico";
        form.onsubmit = onSubmitOriginal;
    };
}

// === NUEVO: Pop-up de registro exitoso ===
const formAlta = document.getElementById("altaMedicoForm");
if(formAlta) {
    formAlta.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const especialidad = document.getElementById("especialidad").value;
        const genero = document.querySelector('input[name="genero"]:checked')?.value || "";
        const imagen = document.getElementById("imagen").value;

        const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

        medicos.push({
            nombre,
            apellido,
            especialidad,
            genero,
            imagenFinal: imagen
        });



        localStorage.setItem("medicos", JSON.stringify(medicos));

        // Pop-up tipo confirm/alert como eliminar
        alert("Registro exitoso");

        formAlta.reset();

        mostrarMedicosEnAlta();
        mostrarMedicosEnIndex();
        actualizarCarruselMovil();
    });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarMedicosEnIndex();
    actualizarCarruselMovil();
    mostrarMedicosEnAlta();
});

