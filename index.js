// index.js

import app from "./api/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
