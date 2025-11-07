const form = document.getElementById('registroForm');
const descripcion = document.getElementById('descripcion');
const contador = document.getElementById('contador');


descripcion.addEventListener('input', () => {
  contador.textContent = `${descripcion.value.length}/150 caracteres`;
});


function mostrarError(idCampo, mensaje) {
  const error = document.getElementById(`error-${idCampo}`);
  const campo = document.getElementById(idCampo);
  error.textContent = mensaje;
  error.style.display = 'block';
  campo.classList.add('input-error');
}

function limpiarError(idCampo) {
  const error = document.getElementById(`error-${idCampo}`);
  const campo = document.getElementById(idCampo);
  error.style.display = 'none';
  campo.classList.remove('input-error');
}

const campos = ['nombre', 'apellido', 'email', 'edad', 'fecha', 'genero', 'pais', 'descripcion'];
campos.forEach(id => {
  const campo = document.getElementById(id);
  campo.addEventListener('input', () => limpiarError(id));
  campo.addEventListener('change', () => limpiarError(id));
});

const terminos = document.getElementById('terminos');
terminos.addEventListener('change', () => {
  document.getElementById('error-terminos').style.display = 'none';
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let valido = true;

  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const email = document.getElementById('email');
  const edad = document.getElementById('edad');
  const fecha = document.getElementById('fecha');
  const genero = document.getElementById('genero');
  const pais = document.getElementById('pais');
  const descripcion = document.getElementById('descripcion');

  
  if (nombre.value.trim().length < 2) {
    mostrarError('nombre', 'Por favor ingresa un nombre válido.');
    valido = false;
  }

  if (apellido.value.trim().length < 2) {
    mostrarError('apellido', 'Por favor ingresa un apellido válido.');
    valido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    mostrarError('email', 'Por favor ingresa un correo electrónico válido.');
    valido = false;
  }

  if (edad.value === '' || edad.value < 1 || edad.value > 120) {
    mostrarError('edad', 'Por favor ingresa una edad válida.');
    valido = false;
  }

  if (!fecha.value) {
    mostrarError('fecha', 'Selecciona una fecha válida.');
    valido = false;
  }

  if (!genero.value) {
    mostrarError('genero', 'Selecciona una opción.');
    valido = false;
  }

  if (pais.value.trim().length < 2) {
    mostrarError('pais', 'Por favor ingresa un país válido.');
    valido = false;
  }

  if (descripcion.value.trim().length < 5) {
    mostrarError('descripcion', 'La descripción debe tener al menos 5 caracteres.');
    valido = false;
  }

  if (!terminos.checked) {
    document.getElementById('error-terminos').style.display = 'block';
    valido = false;
  }

  if (!valido) return;

  
  const datos = {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    email: email.value.trim(),
    edad: edad.value,
    fechaNacimiento: fecha.value,
    genero: genero.value,
    pais: pais.value.trim(),
    descripcion: descripcion.value.trim(),
    fechaRegistro: new Date().toLocaleString()
  };

  const jsonString = JSON.stringify(datos, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = `registro_${datos.nombre}_${datos.apellido}.json`;
  enlace.click();

  form.reset();
  contador.textContent = "0/150 caracteres";
  alert(' Registro exitoso. Tu archivo JSON se descargó correctamente.');
});
