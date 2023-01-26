/* --------------------------------------------------------------- VARIABLES ---------------------------------------------------------------*/

const tbody = document.querySelector("#table__body");
const productos = document.querySelector(".gridProductos");
const search = document.querySelector("#search");
const botonComprar = document.querySelector("#botonComprar");

// si hay productos guardados en LS, el carrito toma ese array, sino queda vacio
let carrito;
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  actualizaDOMcarrito();
} else {
  carrito = [];
}

/* --------------------------------------------------------------- FUNCIONES ---------------------------------------------------------------*/

// crea HTML del listado de productos
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
}

// crea HTML del carrito
function actualizaDOMcarrito() {
  tbody.innerHTML = "";
  let html = "";
  let carritoSinDuplicados = [...new Set(carrito)];

  for (const el of carritoSinDuplicados) {
    // destructuring
    const { img, nombre, precio, id } = el;

    // si repite producto, aumenta contador
    const numeroUnidadesItem = carrito.reduce((total, producto) => {
      return producto.id === id ? (total += 1) : total;
    }, 0);

    html = `<tr class="row itemCarrito">
              <td class="col-2"><img
              src="./assets/img/${img}"></td>
              <td class="col-3">${nombre}</td>
              <td class="col-3" id="cantidadProducto">${numeroUnidadesItem}</td>
              <td class="col-3">$${precio}</td>
              <td class="col-1">
                <button class="btn btn-danger eliminarProducto" data-item="${id}">X</button>
              </td>
            </tr>`;
    tbody.innerHTML += html;
  }

  // creo el boton de comprar
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

      actualizaDOMcarrito();
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

  actualizaDOMcarrito();
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
  actualizaDOMcarrito();
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

// guarda array en LS, si el array esta vacio, elimina LS
function guardarLS(arr) {
  arr.length == 0
    ? localStorage.removeItem("carrito")
    : localStorage.setItem("carrito", JSON.stringify(arr));
}

/* --------------------------------------------------------------- LISTENERS ---------------------------------------------------------------*/

// busqueda por palabra
search.addEventListener("input", () => {
  let filtro = filtrarNombre(listado, search.value.toLowerCase());
  crearHtml(filtro, productos);
  agregarAlCarrito();
});

// finaliza la compra
botonComprar.addEventListener("click", comprar);

// inicio
crearHtml(listado, productos);
agregarAlCarrito();
