const botones = document.querySelectorAll("#panelTabs .nav-link");
const contenedor = document.getElementById("contenido");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Cambia el botón activo visualmente
    botones.forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");

    // Cargar la sección correspondiente
    cargarSeccion(boton.dataset.section);
  });
});

async function cargarSeccion(seccion) {
  let archivo = "";
  let scriptSrc = "";

  // Definir qué HTML y script cargar según la pestaña
  switch (seccion) {
    case "medicos":
      archivo = "altaMedicos.html";
      scriptSrc = "js/altaMedicos.js";
      break;
    case "especialidades":
      archivo = "altaEspecialidades.html";
      scriptSrc = "js/altaEspecialidades.js";
      break;
    case "turnos":
      archivo = "altaTurnos.html";
      scriptSrc = "js/altaTurnos.js";
      break;
    default:
      contenedor.innerHTML = `
        <h2>Bienvenido al Panel de Control</h2>
        <p>Seleccioná una sección para comenzar.</p>
      `;
      return;
  }

  // Spinner de carga
  contenedor.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height:200px;">
      <div class="spinner-border text-success" role="status"></div>
      <span class="ms-2">Cargando ${seccion}...</span>
    </div>
  `;

  try {
    const respuesta = await fetch(archivo);
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo");
    const html = await respuesta.text();
    contenedor.innerHTML = html;

    // 🔹 Ejecutar el JS correspondiente
    const script = document.createElement("script");
    script.type = "module";
    script.src = scriptSrc;
    contenedor.appendChild(script);

  } catch (error) {
    contenedor.innerHTML = `
      <div class="alert alert-danger mt-4">
        Error al cargar la sección: ${error.message}
      </div>
    `;
  }
}

// Carga inicial: abre la pestaña de médicos por defecto
document.addEventListener("DOMContentLoaded", () => cargarSeccion("medicos"));
