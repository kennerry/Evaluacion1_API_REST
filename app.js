// importar express

const express = require("express");
const app = express();

// para que express entienda json

app.use(express.json());

const inventario = [];
let generadorId = 1;

// leer datos con GET

// req = request
// res = response

app.get("/items", (req, res) => {
  res.status(200).json(inventario);
});

// Crear datos

app.post("/items", (req, res) => {
  //Agregar nuevo item
  const nuevoItem = res.body;

  if (!nuevoItem.nombre) {
    return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  }

  nuevoItem.id = generadorId++;
  inventario.push(nuevoItem);

  res.status(201).json({ mensaje: "El item se guardo correctamente!" });
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor de zelda corriendo en: http://localhost:${puerto}`);
});
