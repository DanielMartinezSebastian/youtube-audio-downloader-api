import path from "path";
import fs from "fs";

async function downloadFileHandler(req, res) {
  // Obtiene el nombre del archivo de la URL
  const fileName = req.params.fileName;

  if (!fileName) {
    return res
      .status(400)
      .json({ error: "El nombre del archivo es requerido." });
  }

  // Ruta de destino del archivo descargado
  const sourcePath = path.join(process.cwd(), "cache", fileName);

  // Verificar si el archivo existe
  if (!fs.existsSync(sourcePath)) {
    console.error("Archivo no encontrado:", fileName);
    return res.status(404).json({ error: "Archivo no encontrado." });
  }

  try {
    // Enviar el archivo al cliente
    res.download(sourcePath, (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
        res.status(500).json({ error: "Error al enviar el archivo." });
      } else {
        console.log("Archivo enviado:", fileName);
      }
    });
  } catch (err) {
    console.error("Error al descargar el archivo:", err);
    res.status(500).json({ error: "Error al descargar el archivo." });
  }
}

export default downloadFileHandler;
