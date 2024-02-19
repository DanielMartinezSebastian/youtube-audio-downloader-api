/**
 * Inicia el servidor en el puerto especificado y muestra un mensaje en la consola.
 * @param {number} PORT
 */
import app from "./api/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
