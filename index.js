const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando en Vercel!');
});

// IMPORTANTE: Exporta el módulo
module.exports = app;
