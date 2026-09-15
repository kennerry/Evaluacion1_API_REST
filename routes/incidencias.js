const express = require("express");
const router = express.Router();
const controller = require("../controllers/incidenciasControllers.js");

// Primero para que no de errores con /:id
router.get("/estadisticas", controller.obtenerEstadisticas);
router.post("/", controller.registrarIncidencia);
router.get("/", controller.getIncidencias);
router.get("/:id", controller.buscarIncidenciaPorId);
// Como app.js ya monta "/incidencias", aquí la ruta es relativa: /:id/estado
router.put("/:id/estado", controller.cambiarEstado);
router.delete("/:id", controller.eliminarIncidencia);
router.get("/:id/clasificacion", controller.clasificarIncidencia);

module.exports = router;
