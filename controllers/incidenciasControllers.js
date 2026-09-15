// Llamamos a funciones helpers
const { validarTextoVacio, validarPrioridad } = require("../utils/helpers.js");

const incidencias = []; //Fuente de datos en memoria

let idContador = 1;

// POST /incidencias
function registrarIncidencia(req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  if (!empleado || !area || !descripcion || !prioridad) {
    res.status(400).json({ mensaje: "Todos los campos son obligatorio" });
    return;
  }


  if (
    validarTextoVacio(empleado) ||
    validarTextoVacio(area) ||
    validarTextoVacio(descripcion) ||
    validarTextoVacio(prioridad)
  ) {
    res.status(400).json({ mensaje: "No se permiten cadenas vacias" });
    return;
  }

  if (!validarPrioridad(prioridad)) {
    res
      .status(400)
      .json({ mensaje: "Prioridad solo puede ser: ('Alta', 'Media', 'Baja')" });
    return;
  }

  const prioridadLower = prioridad.trim().toLowerCase();
  const prioridadLimpia =
    prioridadLower.charAt(0).toUpperCase() + prioridadLower.slice(1);

  const incidenciaLimpia = {
id: idContador++,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadLimpia,
    estado: "Pendiente",
  };

  incidencias.push(incidenciaLimpia);
  res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
}

// GET "/" Mostrar todas las incidencias
function getIncidencias(req, res) {
  res.status(200).json(incidencias);
}

// GET "/:id" Buscar incidencia por ID
function buscarIncidenciaPorId(req, res) {
  const idABuscar = parseInt(req.params.id, 10);

  if (isNaN(idABuscar)) {
    res.status(400).json({ mensaje: "El ID proporcionado debe ser numerico" });
    return;
  }

  const incidenciaEncontrada = incidencias.find(
    (incidencia) => incidencia.id === idABuscar,
  );

  if (!incidenciaEncontrada) {
    res.status(404).json({ mensaje: "No se encontro la incidencia" });
    return;
  }

  res.status(200).json(incidenciaEncontrada);
}

//PUT /incidencias/id:/estado
const cambiarEstado = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { estado } = req.body;

  //Switch
  switch (estado) {
    case "Pendiente":
    case "En Proceso":
    case "Resuelta":
    case "Cancelada":
      break;
    default:
      return res.status(400).json({ mensaje: "Estado no válido" });
  }

  const incidencia = incidencias.find((item) => item.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  incidencia.estado = estado;
  return res.json({ mensaje: "Estado actualizado con éxito", incidencia });
};

//DELETE /incidencias/:id
const eliminarIncidencia = (req, res) => {
  const id = parseInt(req.params.id, 10);

  //Busca la posicion en el arreglo
  const indice = incidencias.findIndex((item) => item.id === id);

  //Valida que exista / -1 == no existe
  if (indice === -1) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }
  //Elimina exactamente un elemento
  incidencias.splice(indice, 1);

  return res.json({ mensaje: "Incidencia eliminada correctamente" });
};
// GET /estadisticas
const obtenerEstadisticas = (req, res) => {
  const estadisticas = incidencias.reduce(
    (acumulador, item) => {
      acumulador.totalIncidencias++;

      switch (item.estado) {
        case "Pendiente":
          acumulador.pendientes++;
          break;
        case "En Proceso":
          acumulador.enProceso++;
          break;
        case "Resuelta":
          acumulador.resueltas++;
          break;
        case "Cancelada":
          acumulador.canceladas++;
          break;
      }

      return acumulador;
    },
    {
      totalIncidencias: 0,
      pendientes: 0,
      enProceso: 0,
      resueltas: 0,
      canceladas: 0,
    },
  );

  return res.json(estadisticas);
};

// GET /incidencias/:id/clasificacion
const clasificarIncidencia = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const incidencia = incidencias.find((item) => item.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  let clasificacion = "";

  switch (incidencia.prioridad) {
    case "Alta":
      clasificacion = "Critica";
      break;
    case "Media":
      clasificacion = "Importante";
      break;
    case "Baja":
      clasificacion = "Normal";
      break;
    default:
      clasificacion = "No definida";
  }

  return res.json({
    id: incidencia.id,
    clasificacion,
  });
};

module.exports = {
  incidencias,
  registrarIncidencia,
  getIncidencias,
  buscarIncidenciaPorId,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia,
};
