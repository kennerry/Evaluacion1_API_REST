const validarTextoVacio = (texto) => {
  if (typeof texto !== "string") return true;
  return texto.trim().length === 0;
};

const validarPrioridad = (prioridad) => {
  const prioridadValidar = prioridad.trim().toLowerCase();
  return ["alta", "media", "baja"].includes(prioridadValidar);
};

module.exports = {
  validarTextoVacio,
  validarPrioridad,
};
