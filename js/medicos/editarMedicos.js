import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";
import { convertirArchivoABase64 } from "../../config/convertidorBase64.js"

export function abrirModalEditarMedico(id) {
    const confirmar = confirm(`¿Ingresar en modo Edicion?`);
    if (!confirmar) return

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const medicoAEditar = medicos.find(m => m.id === Number(id));

    const form = document.getElementById("altaMedicoForm");
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputEspecialidad = document.getElementById("especialidad");
    const inputGenero = document.getElementsByName("genero");

    // Llenar formulario con datos existentes
    inputNombre.value = medicoAEditar.nombre || "";
    inputApellido.value = medicoAEditar.apellido || "";
    inputEspecialidad.value = medicoAEditar.especialidad || "";  

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

    form.onsubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!inputNombre.value || !inputApellido.value || !inputEspecialidad.value) {
            alert("Nombre, apellido y especialidad son obligatorios.");
            return;
        };

        medicoAEditar.nombre = inputNombre.value.trim();
        medicoAEditar.apellido = inputApellido.value.trim();
        medicoAEditar.especialidad = inputEspecialidad.value.trim();

        let imagenFinalNueva = medicoAEditar.imagenFinal;
        const archivo = document.getElementById("imagenArchivo").files[0];
        if (archivo) {
            imagenFinalNueva = await convertirArchivoABase64(archivo);
        };

        medicoAEditar.imagenFinal = imagenFinalNueva;

        if(inputGenero) {
            const seleccionado = Array.from(inputGenero).find(r => r.checked);
            if(seleccionado) medicoAEditar.genero = seleccionado.value;
        };

        localStorage.setItem("medicos", JSON.stringify(medicos));
        alert("Edicion exitosa");

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