function renderizarClima(data, nombreCiudad) {

  // Extraemos los campos del JSON
  const temperatura = data.current.temperature_2m;           // temperatura en °C
  const humedad     = data.current.relative_humidity_2m;     // humedad en %
  const viento      = data.current.wind_speed_10m;           // velocidad del viento

  // Construimos la tarjeta HTML
  const tarjeta = `
    <h2>Clima en ${nombreCiudad}</h2>
    <p> Temperatura: ${temperatura} °C</p>
    <p> Humedad: ${humedad} %</p>
    <p> Viento: ${viento} km/h</p>
  `;

  // Inyectamos en la sección de resultados
  resultado.innerHTML = tarjeta;
}
