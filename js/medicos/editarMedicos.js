import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

export function abrirModalEditarMedico(id) {
    const confirmar = confirm(`¿Ingresar en modo Edicion?`);
    if (!confirmar) return

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const medicoAEditar = medicos.find(m => m.id === Number(id));

    const form = document.getElementById("altaMedicoForm");
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputEspecialidad = document.getElementById("especialidad");
    const inputImagen = document.getElementById("imagen");
    const inputGenero = document.getElementsByName("genero");

    // Llenar formulario con datos existentes
    inputNombre.value = medicoAEditar.nombre || "";
    inputApellido.value = medicoAEditar.apellido || "";
    inputEspecialidad.value = medicoAEditar.especialidad || "";
    
    try {
        new URL(medicoAEditar.imagenFinal);
        inputImagen.value = medicoAEditar.imagenFinal;
    } catch {
        inputImagen.value = ""; // el input queda vacío, pero no toca medicoAEditar.imagenFinal
    };

    if(inputGenero) {
        inputGenero.forEach(radio => {
            radio.checked = radio.value === medicoAEditar.genero;
        });
    };

    const botonGuardar = document.getElementById("botonGuardarAlta");
    if(botonGuardar) botonGuardar.textContent = "Guardar Cambios";

    const tituloEdicion = document.getElementById("titulo");
    if(tituloEdicion) tituloEdicion.textContent = "Edición de Médico";

    form.dataset.editId = id;

    const onSubmitOriginal = form.onsubmit;

    form.onsubmit = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!inputNombre.value || !inputApellido.value || !inputEspecialidad.value) {
            alert("Nombre, apellido y especialidad son obligatorios.");
            return;
        };

        medicoAEditar.nombre = inputNombre.value.trim();
        medicoAEditar.apellido = inputApellido.value.trim();
        medicoAEditar.especialidad = inputEspecialidad.value.trim();

        if (inputImagen.value.trim() !== "") {
            try {
                new URL(inputImagen.value);
                medicoAEditar.imagenFinal = inputImagen.value;
            } catch {
                alert("URL de imagen no válida. Se mantiene la anterior.");
            };
        };

        if(inputGenero) {
            const seleccionado = Array.from(inputGenero).find(r => r.checked);
            if(seleccionado) medicoAEditar.genero = seleccionado.value;
        };

        localStorage.setItem("medicos", JSON.stringify(medicos));

        // Refrescar UI
        mostrarMedicosEnAlta();

        // Reset del formulario y botón
        form.reset();
        delete form.dataset.editId;
        if(botonGuardar) botonGuardar.textContent = "Agregar Médico";
        if(tituloEdicion) tituloEdicion.textContent = "Alta de Médico";

        form.onsubmit = onSubmitOriginal;
    };
};