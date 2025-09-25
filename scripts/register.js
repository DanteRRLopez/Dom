/**
 * Para acceder a elementos del Dom, siempre es mediante el document la primera vez.
 * .getElementaById("id") -> Regresa el primer elemento que coincida con el id.
 * .getElementsByClassName("clase") -> Regresa una colección (array-like) de elementos que coincidan con la clase.
 * .getElementsByTagName("tag") -> Regresa una colección (array-like) de elementos que coincidan con el tag.
 * .querySelector("selector css") -> Regresa el primer elemento que coincida con el selector CSS. Un selector CSS puede ser un id (#id), una clase (.clase), un tag (tag), o combinaciones de estos. Ejemplos:
 * #id -> Selecciona por id.
 * .clase -> Selecciona por clase.
 * tag -> Selecciona por tag.
 * .querySelectorAll("selector css") -> Regresa una colección de elementos que coincidan con el selector CSS.
 * 
 * Seleccionar más de un elemento:
 * .getElementsByClassName("clase") -> Regresa una colección de elementos que coincidan con la clase.
 *
 * Para crear elementos HTML desde JS:
 * document.createElement("tag") -> Crea un elemento HTML del tag especificado.
 *
 * Para modificar el contenido de un elemento:
 * .textContent -> Modifica el texto interno del elemento (sin HTML).
 * .innerHTML -> Modifica el contenido HTML interno del elemento (con HTML).
 *
 * Para modificar atributos de un elemento:
 * .setAttribute("atributo", "valor") -> Modifica o crea un atributo con el valor especificado.
 * .getAttribute("atributo") -> Obtiene el valor del atributo especificado.
 * .removeAttribute("atributo") -> Elimina el atributo especificado.
 *
 * Para modificar clases de un elemento:
 * .classList.add("clase") -> Agrega una clase al elemento.
 * .classList.remove("clase") -> Elimina una clase del elemento.
 * .classList.toggle("clase") -> Si el elemento tiene la clase, la elimina; si no la tiene, la agrega.
 * .classList.contains("clase") -> Regresa true si el elemento tiene la clase, false si no la tiene.
 */


const formEl = document.querySelector("form");
const divEl = document.querySelector(".message");
/*agregando evento al elemento
recibe dos argumentos
1. Tipo de evento\
2. un funcion de callback, 
que efecto se va a desencadenar cuando ocurra ese evento
Para evitar efecto por defecto de los elementos usamos
preventDefault
*/
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  divEl.innerHTML = "";
  // const fullName = event.target.elements["exampleInputName"].value;
  //forma de obtener todos los valores de un formulario
  const formData = new FormData(formEl);
  const arrayData = [...formData];
  const objectData = Object.fromEntries(arrayData);
  if(!checkPasswords(objectData.password, objectData.confirmPassword)){
    renderError("Las contraseñas no coinciden");
    return;
  };
  localStorage.setItem(objectData.email,JSON.stringify(objectData));
  renderSuccess("Registro exitoso");
  formEl.reset();
  setTimeout(() => {
    window.location.href ="./pages/login.html"
  }, 3000)
});

//function para checar que ambas contraseñas sean iguales.
const checkPasswords = (password, confirmPassword) => password === confirmPassword;
//function para renderizar un mensaje de error
const renderError = (message) => {
  const alert = `
    <div class="alert alert-danger" role="alert">
     ${message}
    </div>
  `;
  // el innerhtml remplaza el contenido html anterior por el nuevo
  // divEl.innerHTML = alert;
  divEl.insertAdjacentHTML("afterbegin", alert);
}

const renderSuccess = (message) => {
   const alert = `
    <div class="alert alert-success" role="alert">
     ${message}
    </div>
  `;
  // el innerhtml remplaza el contenido html anterior por el nuevo
  // divEl.innerHTML = alert;
  divEl.insertAdjacentHTML("afterbegin", alert);
}