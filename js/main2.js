/* //--------------------------------------------------------------- VARIABLES */

const tbody = document.querySelector("#table__body");
const productos = document.querySelector(".gridProductos");
const search = document.querySelector("#search");
const botonComprar = document.querySelector("#botonComprar");

// si hay productos guardados en LS, el carrito toma ese array, sino queda vacio
let carrito;
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  console.log(carrito);
  actualizaDOMcarrito(carrito);
} else {
  carrito = [];
}
/* //--------------------------------------------------------------- FUNCIONES */

// crea el listado de productos
function crearHtml(arr, donde) {
  donde.innerHTML = "";
  let html = "";
  for (const el of arr) {
    html = `<div class="card align-items-center tarjeta">
              <div class="container_img">
                <img
                  src="./assets/img/${el.img}"
                  class="card-img-top"
                  alt="..."
                />
              </div>
              <div class="card-body align-self-start">
                <h5 class="card-title">${el.nombre.toUpperCase()}</h5>
                <p class="card-text">
                  $${el.precio}
                </p>
                <button class="btn btn-primary button" id="${
                  el.id
                }">Agregar al carrito</button>
              </div>
            </div>`;
    donde.innerHTML += html;
  }
}

// crea html del carrito
function actualizaDOMcarrito(arr) {
  tbody.innerHTML = "";
  let html = "";
  for (const el of arr) {
    html = `<tr class="row itemCarrito">
              <td class="col-2"><img
              src="./assets/img/${el.img}"></td>
              <td class="col-3">${el.nombre}</td>
              <td class="col-3">$${el.precio}</td>
              <td class="col-3">$${el.precio}</td>
              <td class="col-1">
                <button class="btn btn-danger eliminarProducto" data-item="${el.id}">X</button>
              </td>
            </tr>`;
    tbody.innerHTML += html;
  }
  botonComprar.innerHTML = `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">COMPRAR</button>`;

  // elimina producto del carrito
  const removeItem = document.querySelectorAll(".eliminarProducto");
  removeItem.forEach((el) => {
    el.addEventListener("click", eliminarProducto);
  });

  // renderiza precio total
  calculaPrecioTotal(carrito);
}

// agrega un producto al carrito
function agregarAlCarrito() {
  const botones = document.querySelectorAll(".button");
  botones.forEach((el) => {
    el.addEventListener("click", () => {
      let seleccionado = el.getAttribute("id");
      let variante = listado.find((producto) => producto.id == seleccionado);
      carrito.push(variante);
      actualizaDOMcarrito(carrito);
      guardarLS(carrito);
    });
  });
}

// elimina producto del carrito
function eliminarProducto(event) {
  const id = event.target.dataset.item;
  carrito = carrito.filter((carritoId) => {
    return carritoId.id != id;
  });
  actualizaDOMcarrito(carrito);
  guardarLS(carrito);
  calculaPrecioTotal(carrito);
}
// calcula precio total del carrito
function calculaPrecioTotal(arr) {
  const totalCarrito = document.querySelector("#totalCarrito");
  let total = arr.reduce((acc, el) => {
    return acc + el.precio;
  }, 0);
  totalCarrito.innerHTML = `$${total}`;
}

// finalizar la compra
function comprar() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizaDOMcarrito(carrito);
  totalCarrito.innerHTML = "";
  tbody.innerHTML = "";
  botonComprar.innerHTML = "";
}

// filtra por nombre
function filtrarNombre(arr, filtro) {
  const encontrado = arr.filter((producto) => {
    return producto.nombre.includes(filtro);
  });
  return encontrado;
}

// guarda en LS
function guardarLS(arr) {
  localStorage.setItem("carrito", JSON.stringify(arr));
}

/* //--------------------------------------------------------------- LISTENERS */

// busqueda por palabra
search.addEventListener("input", () => {
  let filtro = filtrarNombre(listado, search.value);
  crearHtml(filtro, productos);
  agregarAlCarrito();
});

// finaliza la compra
botonComprar.addEventListener("click", comprar);

// inicio
crearHtml(listado, productos);
agregarAlCarrito();
