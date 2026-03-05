const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const recetas = [
  {
    id: 1,
    nombre: "Matambre al Horno",
    pasos: [
      { id: 1, accion: "Calentar horno (Máximo)", tiempo: 10 },
      { id: 2, accion: "Bajar a mínimo y meter carne", tiempo: 30 },
      { id: 3, accion: "Dar vuelta y condimentar", tiempo: 20 },
      { id: 4, accion: "¡Listo para comer!", tiempo: 0 }
    ]
  }
];

app.get('/api/recetas', (req, res) => res.json(recetas));

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));