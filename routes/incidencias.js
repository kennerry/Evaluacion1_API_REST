const express = require("express");
const router = express.Router();
const controller = require("../controllers/incidenciasControllers");

// Como app.js ya monta "/incidencias", aquí la ruta es relativa: /:id/estado
router.put("/:id/estado", controller.cambiarEstado);
router.delete("/:id", controller.eliminarIncidencia);
router.get("/estadisticas", controller.obtenerEstadisticas);
// router.get("/:id", controller.buscarPorId); //En desarrollo by William Torvalds
router.get("/:id/clasificacion", controller.clasificarIncidencia);
module.exports = router;