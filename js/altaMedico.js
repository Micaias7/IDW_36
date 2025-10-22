import { mostrarMedicosEnAlta } from "./mostrarMedicos.js";

const formAltaMedico = document.getElementById("altaMedicoForm");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEspecialidad = document.getElementById("especialidad");
const inputImagen = document.getElementById("imagen");

function altaMedicos(event) {
    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const especialidad = inputEspecialidad.value.trim();
    const genero = document.querySelector("input[name='genero']:checked")?.value || "";
    const imagenFinal = inputImagen.value.trim() || "public/doctor.png";

    if (!nombre || !apellido || !especialidad || !genero || !imagenFinal) {
        alert("Por favor completa los campos requeridos");
        return;
    }

    const nuevoMedico = { nombre, apellido, especialidad, genero, imagenFinal };

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos.push(nuevoMedico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    mostrarMedicosEnAlta();
    
    alert(
        `Médico registrado con exito !\n\n` +
        `Nombre: ${nombre}\n` +
        `Apellido: ${apellido}\n` +
        `Especialidad: ${especialidad}\n` +
        `Dr/a: ${genero}\n` +
        `Imagen: ${imagenFinal}`
    );

  //     resultado.innerHTML = `
  //   <div class="card mx-auto shadow-sm" style="max-width: 400px;">
  //     <img src="${imagenFinal}" class="card-img-top" alt="public/doctor.png">
  //     <div class="card-body text-center">
  //       <h5 class="card-title">${genero} ${nombre} ${apellido}</h5>
  //       <p class="card-text">${especialidad}</p>
  //     </div>
  //   </div>
  // `;

    formAltaMedico.reset();
}

formAltaMedico.addEventListener("submit", altaMedicos);