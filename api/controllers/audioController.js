/**
 * Manejador para convertir audio.
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
import convertAudio from "../../services/audioConverter.js";

async function convertAudioHandler(req, res) {
  const { url } = req.body;
  try {
    await convertAudio(url, res);
  } catch (err) {
    console.error("Error al convertir audio:", err);
    res.status(500).json({ error: "Error al convertir audio." });
  }
}

export { convertAudioHandler };
