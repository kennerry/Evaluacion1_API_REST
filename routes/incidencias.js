const express = require("express");
const router = express.Router();
const controller = require("../controllers/incidenciasControllers");

// Como app.js ya monta "/incidencias", aquí la ruta es relativa: /:id/estado
router.put("/:id/estado", controller.cambiarEstado);
router.delete("/:id", controller.eliminarIncidencia);
module.exports = router;