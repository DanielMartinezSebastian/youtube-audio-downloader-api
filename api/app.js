/**
 * Express app for the YouTube Audio Downloader API.
 * @module app
 */
import express from "express";
import audioRoutes from "./routes/audioRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

app.use(express.json());

// Rutas relacionadas con los audios
app.use("/audio", audioRoutes);
app.use("/download", fileRoutes);

export default app;
