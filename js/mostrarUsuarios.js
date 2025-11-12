export async function inicializarUsuarios() {
  const tbody = document.getElementById("listaDeUsuarios");
  if (!tbody) return;

  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) throw new Error("Error al listar usuarios");

    const data = await response.json();
    const usuarios = data.users;

    tbody.innerHTML = "";

    usuarios.forEach(element => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${element.firstName} ${element.lastName}</td>
        <td>${element.role}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
      `;
      tbody.appendChild(fila);
    });

  } catch (error) {
    console.error("Error:", error);
    alert("Error al cargar los usuarios desde la API Dummy");
  };
};