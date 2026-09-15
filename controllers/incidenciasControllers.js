const incidencias = []; //Fuente de datos en memoria

//PUT /incidencias/id:/estado
const cambiarEstado = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {estado} = req.body;

    //Switch
    switch(estado) {
        case "Pendiente":
        case "En proceso":
        case "Resuelta": 
        case "Cancelada": 
            break;
        default:
            return res.status(400).json({mensaje: "Estado no válido"});
    }

    const incidencia = incidencias.find((item) => item.id ===id);
    
    if(!incidencia) {
        return res.status(404).json({mensaje: "Incidencia no encontrada"});
    }

    incidencia.estado = estado;
    return res.json({mensaje: "Estado actualizado con éxito", incidencia});
};

//DELETE /incidencias/:id
const eliminarIncidencia = (req, res) => {
    const id = parseInt(req.params.id, 10)

    //Busca la posicion en el arreglo
    const indice = incidencias.findIndex((item) => item.id === id);
    
    //Valida que exista
    if (indice === -1 ) {
        return res.status(404).json({mensaje: "Incidencia encontrada"});
    }
    //Elimina exactamente un elemento
    incidencias.splice(indice, 1);

    return res.json({mensaje: "Incidencia eliminada correctamente"});
}
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
    }
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
      clasificacion = "Crítica";
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
    cambiarEstado,
    eliminarIncidencia, 
    obtenerEstadisticas,
    clasificarIncidencia
}; 