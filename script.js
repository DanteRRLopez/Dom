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
  return `https://ui-avatars.com/api/?name=${n}&background=7C3AED&color=fff&bold=true&size=128`;
}

document.addEventListener("DOMContentLoaded", () => {
  // ----- Registro (index.html) -----
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    const alertBox = document.getElementById("formAlert");

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const pass = document.getElementById("password").value;
      const pass2 = document.getElementById("confirmPassword").value;

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
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const loginAlert = document.getElementById("loginAlert");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const pass = document.getElementById("loginPassword").value;

      const user = getUser();
      if (!user || user.email !== email || user.password !== pass) {
        loginAlert.textContent = "Correo o contraseña incorrectos.";
        loginAlert.classList.remove("d-none");
        return;
      }

      window.location.href = "./user.html";
    });
  }

  // ----- Perfil (pages/user.html) -----
  const userNameEl = document.getElementById("userName");
  const userEmailEl = document.getElementById("userEmail");
  const userAvatarEl = document.getElementById("userAvatar");
  const userAlertEl = document.getElementById("userAlert");
  const logoutBtn = document.getElementById("logoutBtn");

  if (userNameEl && userEmailEl && userAvatarEl) {
    const user = getUser();
    if (!user) {
      userAlertEl.textContent = "No hay usuario cargado. Regístrate o inicia sesión.";
      userAlertEl.classList.remove("d-none");
    } else {
      userNameEl.textContent = user.name || "Usuario";
      userEmailEl.textContent = user.email || "correo@ejemplo.com";
      userAvatarEl.src = makeAvatarUrl(user.name || "U");
      userAvatarEl.alt = `Avatar de ${user.name || "Usuario"}`;
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearUser();
      window.location.href = "../index.html";
    });
  }
});
