// ── Selectores del DOM
const selector     = document.getElementById('selectorCiudad');
const boton        = document.getElementById('btnConsultar');
const resultado    = document.getElementById('resultado');
const mensajeError = document.getElementById('mensajeError');

// ── Coordenadas de cada ciudad
const CIUDADES = {
  lima:     { lat: -12.0464, lon: -77.0428, nombre: "Lima" },
  cusco:    { lat: -13.53195, lon: -71.96746, nombre: "Cusco" },
  arequipa: { lat: -16.3989, lon: -71.535,   nombre: "Arequipa" },
  trujillo: { lat: -8.11599, lon: -79.02998, nombre: "Trujillo" },
  piura:    { lat: -5.19449, lon: -80.63282, nombre: "Piura" },
  iquitos:  { lat: -3.74912, lon: -73.25383, nombre: "Iquitos" }
};

// ── URL base de la API
const URL_BASE = "https://api.open-meteo.com/v1/forecast";

// ── Función principal
async function consultarClima() {
  const clave = selector.value;          // valor del <select>
  const ciudad = CIUDADES[clave];        // objeto con lat, lon y nombre

  ocultarError();
  resultado.innerHTML = '<p>Cargando...</p>';

  try {
    // Construimos la URL con las coordenadas
    const url = `${URL_BASE}?latitude=${ciudad.lat}&longitude=${ciudad.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=America/Lima`;

    // Petición a la API
    const response = await fetch(url);

    // Verificamos que fue exitosa
    if (!response.ok) {
      throw new Error(`Error al conectar con la API (${response.status})`);
    }

    // Convertimos a objeto JS
    const data = await response.json();

    // Renderizamos resultados
    renderizarClima(data, ciudad.nombre);

  } catch (error) {
    resultado.innerHTML = '';
    mostrarError('ERROR ' + error.message);
  }
}

// ── Helpers
function mostrarError(msg) {
  mensajeError.textContent = msg;
  mensajeError.style.display = 'block';
}

function ocultarError() {
  mensajeError.textContent = '';
  mensajeError.style.display = 'none';
}

// ── Eventos
boton.addEventListener('click', consultarClima);
