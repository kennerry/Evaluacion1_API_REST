// importar express
const express = require("express");
const app = express();
const incidenciaRoutes = require("./routes/incidencias.js");
// para que express entienda json
app.use(express.json());
//La ruta que express va usar
app.use("/incidencias", incidenciaRoutes);

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
