import express from "express";
import { convertAudioHandler } from "../controllers/audioController.js";

const router = express.Router();

// Definir la ruta para descargar audio
router.post("/convert", convertAudioHandler);

export default router;
