import path from "path";

async function downloadFileHandler(req, res) {
  const { fileName } = req.body; // Se espera que el cuerpo de la solicitud contenga el nombre del archivo
  if (!fileName) {
    return res
      .status(400)
      .json({ error: "El nombre del archivo es requerido." });
  }

  // Ruta de destino del archivo descargado
  const destinationPath = path.join(process.cwd(), "cache", fileName);

  try {
    // Llama a la función downloadFile
    await downloadFile(destinationPath);
    res.status(200).json({ message: "Archivo descargado exitosamente." });
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    res.status(500).json({ error: "Error al descargar el archivo." });
  }
}

export default downloadFileHandler;
