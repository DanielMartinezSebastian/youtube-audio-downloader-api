import path from "path";
import downloadFile from "../../services/fileDownloader.js";

async function downloadFileHandler(req, res) {
  const { fileName } = req.body; // Puedes enviar el nombre del archivo desde el cliente si lo deseas
  const destinationPath = path.join(process.cwd(), "cache", fileName); // Ruta de destino del archivo descargado
  try {
    await downloadFile(destinationPath); // Llama a la función downloadFile
    res.status(200).json({ message: "Archivo descargado exitosamente." });
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    res.status(500).json({ error: "Error al descargar el archivo." });
  }
}

export { downloadFileHandler };
