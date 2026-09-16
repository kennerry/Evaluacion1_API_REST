//Plantillas de verificación para no repetir la misma logica en controllers
const validarTextoVacio = (texto) => {
  if (typeof texto !== "string") return true;
  return texto.trim().length === 0;
};

const validarPrioridad = (prioridad) => {
  if (typeof prioridad !== "string") return false;

  const prioridadValidar = prioridad.trim().toLowerCase();
  return ["alta", "media", "baja"].includes(prioridadValidar);
};

module.exports = {
  validarTextoVacio,
  validarPrioridad,
};
