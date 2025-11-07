const botones = document.querySelectorAll("#panelTabs .nav-link");
const contenedor = document.getElementById("contenido");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    botones.forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    cargarSeccion(boton.dataset.section);
  });
});

async function cargarSeccion(seccion) {
  let archivo = "";
  let scriptModulo = "";

  switch (seccion) {
    case "medicos":
      archivo = "altaMedicos.html";
      scriptModulo = "./medicos/altaMedicos.js";
      break;
    case "especialidades":
      archivo = "altaEspecialidades.html";
      scriptModulo = "./especialidades/altaEspecialidades.js";
      break;
    case "turnos":
      archivo = "altaTurnos.html";
      scriptModulo = "./turnos/altaTurnos.js";
      break;
    default:
      contenedor.innerHTML = `
        <h2>Bienvenido al Panel de Control</h2>
        <p>Seleccioná una sección para comenzar.</p>
      `;
      return;
  };

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

    // Importar el módulo correspondiente
    import(scriptModulo)
      .then(mod => {
        if (seccion === "medicos" && mod.inicializarAltaMedicos) {
          mod.inicializarAltaMedicos();
          import("./medicos/mostrarMedicos.js")
            .then(mod2 => mod2.mostrarMedicosEnAlta())
            .catch(err => console.error(err));
        };
        if (seccion === "especialidades" && mod.inicializarAltaEspecialidades) {
          mod.inicializarAltaEspecialidades();
          import("./especialidades/mostrarEspecialidades.js")
            .then(mod2 => mod2.mostrarEspecialidades())
            .catch(err => console.error(err));
        };
      })
      .catch(err => console.error(`Error al cargar módulo de ${seccion}:`, err));

  } catch (error) {
    contenedor.innerHTML = `
      <div class="alert alert-danger mt-4">
        Error al cargar la sección: ${error.message}
      </div>
    `;
  };
};

// Carga inicial
document.addEventListener("DOMContentLoaded", () => cargarSeccion("medicos"));