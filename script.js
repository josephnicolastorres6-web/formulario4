// --- REFERENCIAS PRINCIPALES ---
const form = document.getElementById('registroForm');
const barra = document.getElementById('barra');
const descripcion = document.getElementById('descripcion');
const contador = document.getElementById('contador');
const terminos = document.getElementById('terminos');

// Lista de todos los campos que se deben llenar
const campos = ['nombre', 'apellido', 'email', 'edad', 'fecha', 'genero', 'pais', 'descripcion'];

// --- ACTUALIZAR CONTADOR DE CARACTERES ---
descripcion.addEventListener('input', () => {
  contador.textContent = `${descripcion.value.length}/150 caracteres`;
  actualizarBarraProgreso();
});

// --- FUNCIÓN: ACTUALIZAR LA BARRA DE PROGRESO ---
function actualizarBarraProgreso() {
  let completados = 0;
  const total = campos.length -1; 

  campos.forEach(id => {
    const campo = document.getElementById(id);

    if (campo.type === 'checkbox' ){
    if (campo.value && campo.value.trim() !== '') {
      completados++;
    }
  

  if (terminos.checked) completados++;

  const porcentaje = Math.round((completados / total) * 100);
  barra.style.width = porcentaje + '%';
}

// --- ESCUCHADORES EN TODOS LOS CAMPOS ---
campos.forEach(id => {
  const campo = document.getElementById(id);
  campo.addEventListener('input', actualizarBarraProgreso);
  campo.addEventListener('change', actualizarBarraProgreso);
});
terminos.addEventListener('change', actualizarBarraProgreso);

// --- BOTÓN "BORRAR" (RESET) ---
form.addEventListener('reset', () => {
  setTimeout(() => {
    barra.style.width = '0%';
    contador.textContent = '0/150 caracteres';
  }, 50); // Pequeño retraso para que el reset del form se complete
});

// --- VALIDACIÓN Y DESCARGA DEL JSON AL ENVIAR ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const datos = {};
  let valido = true;

  campos.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo.value.trim()) {
      document.getElementById(`error-${id}`).style.display = 'block';
      campo.classList.add('input-error');
      valido = false;
    } else {
      document.getElementById(`error-${id}`).style.display = 'none';
      campo.classList.remove('input-error');
      datos[id] = campo.value.trim();
    }
  });

  if (!terminos.checked) {
    document.getElementById('error-terminos').style.display = 'block';
    valido = false;
  } else {
    document.getElementById('error-terminos').style.display = 'none';
    datos.terminos = true;
  }

  if (!valido) return;

  // Crear y descargar JSON
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = `registro_${datos.nombre || 'usuario'}.json`;
  enlace.click();

  // Resetear formulario y barra
  form.reset();
  barra.style.width = '0%';
  contador.textContent = '0/150 caracteres';
  alert('✅ Registro exitoso. Tu archivo JSON se descargó correctamente.');
});
