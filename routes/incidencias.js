//router almacena todas las rutas       
const express = require("express");
const router = express.Router(); //Crea un mini servidor con las rutas
const controller = require("../controllers/incidenciasControllers.js");

// Primero para que no de errores con /:id colocamos las otras rutas
router.get("/estadisticas", controller.obtenerEstadisticas);
router.post("/", controller.registrarIncidencia);
router.get("/", controller.getIncidencias);
router.get("/:id", controller.buscarIncidenciaPorId);
// Como app.js ya monta "/incidencias", aquí la ruta es relativa: /:id/estado
router.put("/:id/estado", controller.cambiarEstado);
router.delete("/:id", controller.eliminarIncidencia);
router.get("/:id/clasificacion", controller.clasificarIncidencia);
//exporta las rutas relacionadas a incidencias (las hace publicas a otros modulos)
module.exports = router;
