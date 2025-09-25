const formLogin = document.getElementById("loginForm");
const btnEl = document.getElementById("btnForm");
const btnCambio = document.getElementById("cambio");
/*
1. obtener la data del localstorage si existe ese email
comparar contraseñas
redigir al usuario
botton cambiar clases.
*/

formLogin.addEventListener("submit", (event) => {
  //evitar que se reinicia la pagina 
  event.preventDefault();
  const email = event.target.elements["email"]?.value || "";
  const password =  event.target.elements["password"]?.value || "";
  const localData = getUserInfo(email);
  if(localData === undefined){
    btnEl.classList.remove("btn-primary");
    btnEl.classList.add("btn-danger");
    return;
  };
  if(checkPassword(localData, password)) {
    btnEl.classList.remove("btn-primary");
    btnEl.classList.remove("btn-danger");
    btnEl.classList.add("btn-success");
    setTimeout(() => {
      window.location.href = "../pages/user.html"
    },3000)
  }else{
    // marcar el campo de contraseña para indicar error
    if (event.target.elements["password"]) {
      event.target.elements["password"].style.backgroundColor = "red";
    }
    btnEl.classList.remove("btn-primary");
    btnEl.classList.add("btn-danger");
    return;
  }
} );

const getUserInfo = (email) => {
  const data =  localStorage.getItem(email);
  if(data === null) return; 
  return JSON.parse(data);
}

const checkPassword = ({password}, loginPassword) =>{
  console.log({password});
  console.log({loginPassword});
  return password === loginPassword;
}

if (btnCambio) {
  btnCambio.addEventListener("click", () => {
    btnCambio.classList.toggle("btn-primary");
  });
}
