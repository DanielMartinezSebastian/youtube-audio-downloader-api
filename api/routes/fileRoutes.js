import express from "express";
import { downloadFileHandler } from "../controllers/fileController.js";

const router = express.Router();

// Definir la ruta para descargar archivos
router.post("/download-file", downloadFileHandler);

export default router;
