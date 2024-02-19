import express from "express";
import { downloadFileHandler } from "../controllers/fileController.js";

const router = express.Router();

// Definir la ruta para descargar archivos
router.get("/:fileName", downloadFileHandler);

export default router;
