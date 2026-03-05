import React, { useState, useEffect } from 'react';

function App() {
  const [pasos, setPasos] = useState([]);
  const [pasoActual, setPasoActual] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    // Simulamos carga de API
    fetch('http://localhost:5000/api/recetas')
      .then(res => res.json())
      .then(data => {
        setPasos(data[0].pasos);
        setSegundos(data[0].pasos[0].tiempo * 60);
      });
  }, []);

  useEffect(() => {
    let intervalo = null;
    if (activo && segundos > 0) {
      intervalo = setInterval(() => setSegundos(s => s - 1), 1000);
    } else if (segundos === 0 && activo) {
      alert("¡ALERMA! Siguiente paso: " + pasos[pasoActual + 1]?.accion);
      setActivo(false);
      avanzarPaso();
    }
    return () => clearInterval(intervalo);
  }, [activo, segundos]);

  const avanzarPaso = () => {
    if (pasoActual < pasos.length - 1) {
      const siguiente = pasoActual + 1;
      setPasoActual(siguiente);
      setSegundos(pasos[siguiente].tiempo * 60);
    }
  };

  const formatearTiempo = (s) => {
    const min = Math.floor(s / 60);
    const seg = s % 60;
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
      <h1>👨‍🍳 Mi App de Cocina</h1>
      {pasos.length > 0 && (
        <div>
          <h2>Paso {pasoActual + 1}: {pasos[pasoActual].accion}</h2>
          <div style={{ fontSize: '4rem', margin: '20px' }}>{formatearTiempo(segundos)}</div>
          <button onClick={() => setActivo(!activo)} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
            {activo ? 'Pausar' : 'Iniciar Paso'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;