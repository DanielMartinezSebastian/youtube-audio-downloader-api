// api/app.js
import express from "express";
import audioRoutes from "./routes/audioRoutes.js";

const app = express();

app.use(express.json());

// Rutas relacionadas con los audios
app.use("/audios", audioRoutes);

export default app;
