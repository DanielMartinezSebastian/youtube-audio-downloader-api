// api/routes/audioRoutes.js
import express from "express";
import { downloadAudioHandler } from "../controllers/audioController.js";

const router = express.Router();

// Definir la ruta para descargar audio
router.post("/download-audio", downloadAudioHandler);

export default router;
