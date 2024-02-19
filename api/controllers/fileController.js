/**
 * Manejador para descargar un archivo.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la descarga del archivo.
 */
import downloadFile from "../../services/fileDownloader.js";

async function downloadFileHandler(req, res) {
  try {
    await downloadFile(req, res);
  } catch (err) {
    console.error("Error al encontrar el archivo:", err);
    res.status(500).json({ error: "Error al encontrar el archivo." });
  }
}

export { downloadFileHandler };
