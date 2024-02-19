// api/controllers/audioController.js
import downloadAudio from "../../services/audioDownloader.js";

async function downloadAudioHandler(req, res) {
  const { url } = req.body;
  try {
    await downloadAudio(url, res);
  } catch (err) {
    console.error("Error al descargar audio:", err);
    res.status(500).json({ error: "Error al descargar audio." });
  }
}

export { downloadAudioHandler };
