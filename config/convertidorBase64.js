// <-- agregado: función auxiliar para convertir archivo a Base64
export function convertirArchivoABase64(archivo) {
  // Esta función convierte un archivo (como una imagen seleccionada desde la computadora)
  // en una cadena de texto codificada en Base64 usando FileReader.
  // Ese formato permite guardar la imagen directamente dentro del LocalStorage.
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result); // Cuando termina de leer, devuelve la cadena Base64
    lector.onerror = (error) => reject(error); // Si hay un error en la lectura, lo captura
    lector.readAsDataURL(archivo); // Lee el archivo como "Data URL" (formato Base64)
  });
};