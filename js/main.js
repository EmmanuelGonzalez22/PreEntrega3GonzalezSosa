/* --------------------------------------------------------------- VARIABLES ---------------------------------------------------------------*/

const productos = document.querySelector(".gridProductos");

// si hay productos guardados en LS, el carrito toma ese array, sino queda vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch(`./data/data.json`)
  .then((response) => response.json())
  .then((data) => {
    crearHtml(data, productos);
  })
  .catch((error) => {
    console.log(error);
    location.href(`https://http.cat/404`);
  });

function crearHtml(arr, donde) {
  donde.innerHTML = "";
  let html = "";
  for (const el of arr) {
    const { img, nombre, precio, id } = el;
    html = `<div class="card align-items-center tarjeta">
                <div class="container_img">
                  <img
                    src="./assets/img/${img}"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="card-body align-self-start">
                  <h5 class="card-title">${nombre.toUpperCase()}</h5>
                  <p class="card-text">
                    $${precio}
                  </p>
                  <button class="btn btn-primary button" id="${id}">Agregar al carrito</button>
                </div>
              </div>`;
    donde.innerHTML += html;
  }

  const botones = document.querySelectorAll(".button");
  botones.forEach((btn) => {
    btn.addEventListener("click", (e) => agregarAlCarrito(e, arr));
  });
}

function agregarAlCarrito(e, prods) {
  const productoElegido = prods.find((el) => el.id === parseInt(e.target.id));
  carrito.push(productoElegido);
  guardarLS(carrito);
}

// guarda array en LS, si el array esta vacio, elimina LS
function guardarLS(arr) {
  arr.length == 0
    ? localStorage.removeItem("carrito")
    : localStorage.setItem("carrito", JSON.stringify(arr));
}
