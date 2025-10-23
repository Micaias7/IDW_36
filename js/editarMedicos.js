import { mostrarMedicosEnAlta, mostrarMedicosEnIndex, actualizarCarruselMovil } from "./mostrarMedicos.js";

export function abrirModalEditarMedico(index) {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const medico = medicos[index];

    const form = document.getElementById("altaMedicoForm");
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputEspecialidad = document.getElementById("especialidad");
    const inputImagen = document.getElementById("imagen");
    const inputGenero = document.getElementsByName("genero");

    // Llenar formulario con datos existentes
    inputNombre.value = medico.nombre || "";
    inputApellido.value = medico.apellido || "";
    inputEspecialidad.value = medico.especialidad || "";
    
    try {
        new URL(medico.imagenFinal);
        inputImagen.value = medico.imagenFinal;
    } catch {
        inputImagen.value = ""; // el input queda vacío, pero no toca medico.imagenFinal
    }

    if(inputGenero) {
        inputGenero.forEach(radio => {
            radio.checked = radio.value === medico.genero;
        });
    }

    const botonGuardar = document.getElementById("botonGuardarAlta");
    if(botonGuardar) botonGuardar.textContent = "Guardar Cambios";

    const tituloEdicion = document.getElementById("titulo");
    if(tituloEdicion) tituloEdicion.textContent = "Edición de Médico";

    form.dataset.editIndex = index;

    const onSubmitOriginal = form.onsubmit;

    form.onsubmit = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!inputNombre.value || !inputApellido.value || !inputEspecialidad.value) {
            alert("Nombre, apellido y especialidad son obligatorios.");
            return;
        }

        // Actualizar solo los campos válidos
        medico.nombre = inputNombre.value;
        medico.apellido = inputApellido.value;
        medico.especialidad = inputEspecialidad.value;

        // Solo actualizar URL si es válida
        try {
            new URL(inputImagen.value);
        } catch {
            // Si no es válida, se mantiene la URL anterior
            medico.imagenFinal = inputImagen.value;
        }

        if(inputGenero) {
            const seleccionado = Array.from(inputGenero).find(r => r.checked);
            if(seleccionado) medico.genero = seleccionado.value;
        }

        // Guardar cambios en localStorage
        medicos[index] = medico;
        localStorage.setItem("medicos", JSON.stringify(medicos));

        // Refrescar UI
        mostrarMedicosEnAlta();
        mostrarMedicosEnIndex();
        actualizarCarruselMovil();

        // Reset del formulario y botón
        form.reset();
        delete form.dataset.editIndex;
        if(botonGuardar) botonGuardar.textContent = "Agregar Médico";
        if(tituloEdicion) tituloEdicion.textContent = "Alta de Médico";

        form.onsubmit = onSubmitOriginal;
    };
}
