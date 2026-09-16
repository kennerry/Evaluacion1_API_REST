// importar express
const express = require("express");
const app = express();
//Importamos las rutas
const incidenciaRoutes = require("./routes/incidencias.js");
//Para que express entienda json
app.use(express.json());
//Montar todas las rutas del router debajo de /incidencias
app.use("/incidencias", incidenciaRoutes);

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
//Middleware configuran y procesan las peticiones como express.json