// Clave en localStorage para guardar los datos del usuario
const LS_KEY = "demoUser";

// Utilidad simple para leer/guardar usuario
function getUser() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)); }
  catch { return null; }
}
function setUser(obj) {
  localStorage.setItem(LS_KEY, JSON.stringify(obj));
}
function clearUser() {
  localStorage.removeItem(LS_KEY);
}

// Avatar por iniciales usando ui-avatars (sin backend)
function makeAvatarUrl(name) {
  const n = encodeURIComponent(name || "U");
  // Morado (7C3AED) sobre blanco
  return `https://ui-avatars.com/api/?name=${n}&background=7C3AED&color=fff&bold=true&size=128`; // Tamaño 128x128
}

document.addEventListener("DOMContentLoaded", () => {
  // ----- Registro (index.html) -----
  const registerForm = document.getElementById("registerForm"); // Elemento del formulario de registro
  if (registerForm) {
    const alertBox = document.getElementById("formAlert"); // Elemento para mostrar alertas de registro


    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

      // Limpia alertas previas
      alertBox.textContent = "";
      alertBox.classList.add("d-none");

      // Valida campos
      const name = document.getElementById("name").value.trim(); // Accediendo al valor del input por su atributo "name"  
      const email = document.getElementById("email").value.trim().toLowerCase(); // Accediendo al valor del input por su atributo "name"
      const pass = document.getElementById("password").value; // Accediendo al valor del input por su atributo "name"
      const pass2 = document.getElementById("confirmPassword").value; // Accediendo al valor del input por su atributo "name"

      if (pass !== pass2) {
        alertBox.textContent = "Las contraseñas no coinciden.";
        alertBox.classList.remove("d-none");
        return;
      }

      // Guarda el usuario (nota: demo sin cifrado, solo práctica)
      setUser({ name, email, password: pass });

      // Redirige al perfil
      window.location.href = "./pages/user.html";
    });
  }

  // ----- Login (pages/login.html) -----
  const loginForm = document.getElementById("loginForm"); // Elemento del formulario de login
  if (loginForm) {
    const loginAlert = document.getElementById("loginAlert"); // Elemento para mostrar alertas de login

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase(); // Accediendo al valor del input por su atributo "name"
      const pass = document.getElementById("loginPassword").value; // Accediendo al valor del input por su atributo "name"

      const user = getUser();
      if (!user || user.email !== email || user.password !== pass) {
        loginAlert.textContent = "Correo o contraseña incorrectos."; // Mensaje de error
        loginAlert.classList.remove("d-none"); // Mostrar el elemento
        return;
      }

      window.location.href = "./user.html";
    });
  }

  // ----- Perfil (pages/user.html) -----
  const userNameEl = document.getElementById("userName"); // Elemento para mostrar el nombre del usuario
  const userEmailEl = document.getElementById("userEmail"); // Elemento para mostrar el email del usuario
  const userAvatarEl = document.getElementById("userAvatar"); // Elemento <img> para el avatar del usuario
  const userAlertEl = document.getElementById("userAlert"); // Elemento para mostrar alertas (si no hay usuario)
  const logoutBtn = document.getElementById("logoutBtn"); // Botón para cerrar sesión


  if (userNameEl && userEmailEl && userAvatarEl) {
    const user = getUser();
    if (!user) {
      userAlertEl.textContent = "No hay usuario cargado. Regístrate o inicia sesión."; // Mensaje de alerta
      userAlertEl.classList.remove("d-none"); // Mostrar el elemento
    } else {
      userNameEl.textContent = user.name || "Usuario"; // Mostrar nombre o "Usuario" si no hay nombre
      userEmailEl.textContent = user.email || "correo@ejemplo.com"; // Mostrar email o placeholder si no hay email
      // Generar URL del avatar y asignarla al elemento <img>
      userAvatarEl.src = makeAvatarUrl(user.name || "U"); // Usar "U" si no hay nombre
      userAvatarEl.alt = `Avatar de ${user.name || "Usuario"}`; // Texto alternativo para el avatar
    }
  }

});
