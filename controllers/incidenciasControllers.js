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

module.exports = {
    incidencias,
    cambiarEstado,
}; 