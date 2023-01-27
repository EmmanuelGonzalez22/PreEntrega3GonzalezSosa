/* --------------------------------------------------------------- VARIABLES ---------------------------------------------------------------*/

const tbody = document.querySelector("#table__body");
const productos = document.querySelector(".gridProductos");
const search = document.querySelector("#search");
const botonComprar = document.querySelector("#botonComprar");

// si hay productos guardados en LS, el carrito toma ese array, sino queda vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

  // quito duplicados del carrito
  let carritoSinDuplicados = [...new Set(carrito)];

  // busca el producto que coincide con el id
  for (const el of carritoSinDuplicados) {
    const seleccionado = listado.find((producto) => {
      return producto.id === parseInt(el);
    });

    // si repite producto, aumenta contador
    const numeroUnidadesItem = carrito.reduce((total, producto) => {
      return producto === el ? (total += 1) : total;
    }, 0);

    html = `<tr class="row itemCarrito">
              <td class="col-2"><img
              src="./assets/img/${seleccionado.img}"></td>
              <td class="col-3">${seleccionado.nombre}</td>
              <td class="col-3" id="cantidadProducto">${numeroUnidadesItem}</td>
              <td class="col-3">$${seleccionado.precio}</td>
              <td class="col-1">
                <button class="btn btn-danger eliminarProducto" data-item="${seleccionado.id}">X</button>
              </td>
            </tr>`;
    tbody.innerHTML += html;

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

  // conteo de productos en el carrito
  const contadorCarrito = document.querySelector("#contadorCarrito");
  contadorCarrito.textContent = carrito.length;
}

// agrega un producto al carrito
function agregarAlCarrito() {
  const botones = document.querySelectorAll(".button");
  botones.forEach((el) => {
    el.addEventListener("click", () => {
      let seleccionado = el.getAttribute("id");

      carrito.push(seleccionado);
      actualizaDOMcarrito();
      guardarLS(carrito);
    });
  });
}

// elimina producto del carrito
function eliminarProducto(event) {
  const id = event.target.dataset.item;
  console.log(id);
  carrito = carrito.filter((carritoId) => {
    return carritoId != id;
  });

  // si el carrito queda vacio, desaparece boton de comprar
  if (carrito.length === 0) {
    botonComprar.innerHTML = "";
  }

  actualizaDOMcarrito();
  guardarLS(carrito);
  calculaPrecioTotal(carrito);
}

// calcula precio total del carrito
function calculaPrecioTotal(arr) {
  const totalCarrito = document.querySelector("#totalCarrito");

  let total = arr
    .reduce((acc, el) => {
      const seleccionado = listado.find((producto) => {
        return producto.id === parseInt(el);
      });
      return acc + seleccionado.precio;
    }, 0)
    .toFixed(2);

  carrito.length !== 0
    ? (totalCarrito.innerHTML = `$${total}`)
    : (totalCarrito.innerHTML = ``);
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

// guarda array en LS, si el array esta vacio, elimina LS
function guardarLS(arr) {
  arr.length == 0
    ? localStorage.removeItem("carrito")
    : localStorage.setItem("carrito", JSON.stringify(arr));
}

/* --------------------------------------------------------------- LISTENERS ---------------------------------------------------------------*/

// finaliza la compra
botonComprar.addEventListener("click", comprar);

// inicio
crearHtml(listado, productos);
agregarAlCarrito();
actualizaDOMcarrito();
