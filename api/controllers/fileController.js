/**
 * Manejador para descargar un archivo.
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
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
