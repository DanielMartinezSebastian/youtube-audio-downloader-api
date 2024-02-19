// api/routes/audioRoutes.js
import express from "express";
import downloadAudio from "../services/audioDownloader.js";

const router = express.Router();

// Definir la ruta para descargar audio
router.post("/download-audio", async (req, res) => {
  const { url } = req.body;
  try {
    await downloadAudio(url);
    res.status(200).json({ message: "Descarga de audio iniciada." });
  } catch (err) {
    console.error("Error al descargar audio:", err);
    res.status(500).json({ error: "Error al descargar audio." });
  }
});

export default router;
