/* --------------------------------------------------------------- VARIABLES ---------------------------------------------------------------*/

const tbody = document.querySelector("#table__body");
const productos = document.querySelector(".gridProductos");
const search = document.querySelector("#search");
const botonComprar = document.querySelector("#botonComprar");
const categorias = ["perro", "gato", "camitas", "accesorios"];
const formCheckbox = document.querySelector("#formCheckbox");

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
  agregarAlCarrito();
}

// crea HTML del carrito
function actualizaDOMcarrito() {
  tbody.innerHTML = "";
  let html = "";

  // quito duplicados del carrito
  let carritoSinDuplicados = [...new Set(carrito)];

  // busca el producto que coincide con el id
  for (const el of carritoSinDuplicados) {
    const seleccionado = listado.filter((producto) => {
      return producto.id === parseInt(el);
    });

    // si repite producto, aumenta contador
    const numeroUnidadesItem = carrito.reduce((total, producto) => {
      return producto === el ? (total += 1) : total;
    }, 0);

    html = `<tr class="row itemCarrito">
              <td class="col-2"><img
              src="./assets/img/${seleccionado[0].img}"></td>
              <td class="col-3">${seleccionado[0].nombre}</td>
              <td class="col-3" id="cantidadProducto">${numeroUnidadesItem}</td>
              <td class="col-3">$${seleccionado[0].precio}</td>
              <td class="col-1">
                <button class="btn btn-danger eliminarProducto" data-item="${seleccionado[0].id}">X</button>
              </td>
            </tr>`;
    tbody.innerHTML += html;

    // creo el boton de comprar
    botonComprar.innerHTML = `
    <label for="nombre">Ingrese su nombre: </label>
    <input type="text" name="nombre" placeholder="Firulais" id="" required />
    <label for="apellido">Ingrese su apellido: </label>
    <input type="text" name="apellido" placeholder="Bola de nieve" id="" required />
    <label for="telefono">Ingrese su teléfono: </label>
    <input type="text" name="telefono" placeholder="123456789" id="inputTelefono" required />
    <label for="direccion">Ingrese su dirección: </label>
    <input type="text" name="direccion" placeholder="Avenida Siempreviva 742" id="" required />
    <input type="submit" value="Comprar" class="btn btn-primary"/>
    `;

    // valido que solo se ingresen numeros en telefono
    const inputTelefono = document.querySelector("#inputTelefono");
    inputTelefono.addEventListener("keypress", validar);

    // elimina producto del carrito
    const removeItem = document.querySelectorAll(".eliminarProducto");
    removeItem.forEach((el) => {
      el.addEventListener("click", eliminarProducto);
    });

    // renderiza precio total
    calculaPrecioTotal(carrito);
  }

  // conteo de productos en el icono del carrito
  const contadorCarrito = document.querySelector("#contadorCarrito");
  contadorCarrito.textContent = carrito.length;
}

// agrega un producto al carrito
function agregarAlCarrito() {
  const botones = document.querySelectorAll(".button");
  botones.forEach((el) => {
    el.addEventListener("click", () => {
      let seleccionado = el.getAttribute("id");

      // mensaje toastify
      Toastify({
        text: "Producto añadido al carrito \n\nClick aquí para ir".toUpperCase(),
        duration: 2000,
        gravity: "bottom",
        position: "left",
        style: {
          background: "background: rgb(45,122,5)",
          background:
            "linear-gradient(122deg, rgba(45,122,5,1) 0%, rgba(85,196,32,1) 100%)",
        },
        onClick: function () {
          window.scroll(0, 999999);
        },
      }).showToast();

      carrito.push(seleccionado);
      actualizaDOMcarrito();
      guardarLS(carrito);
    });
  });
}

// elimina producto del carrito
function eliminarProducto(event) {
  const id = event.target.dataset.item;
  carrito = carrito.filter((carritoId) => {
    return carritoId != id;
  });

  // si el carrito queda vacio, desaparece boton de comprar
  if (carrito.length === 0) {
    botonComprar.innerHTML = "";
  }

  // mensaje toastify
  Toastify({
    text: "Producto eliminado \n del carrito".toUpperCase(),
    duration: 2000,
    position: "left",
    style: {
      background: "rgb(88,7,7)",
      background:
        "linear-gradient(137deg, rgba(88,7,7,1) 0%, rgba(214,42,42,1) 100%)",
    },
  }).showToast();

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

  // mensaje de compra sweetalert
  Swal.fire({
    title:
      "Muchas gracias por su compra! En 48hs estará recibiendo su pedido. \n\n GUAU GUAU!",
    width: 600,
    padding: "3em",
    color: "white",
    background: "rgb(0,0,0)",
    background:
      "radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(241,196,15,1) 100%)",
    icon: "success",
    html: "",
    timer: 3500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {}, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
}

// guarda array en LS, si el array esta vacio, elimina LS
function guardarLS(arr) {
  arr.length == 0
    ? localStorage.removeItem("carrito")
    : localStorage.setItem("carrito", JSON.stringify(arr));
}

// valida que solo se ingresen numeros
function validar(evento) {
  const codNumber = evento.which;
  if (codNumber >= 48 && codNumber <= 57) {
    return true;
  } else {
    evento.preventDefault();
    return false;
  }
}

/* --------------------------------------------------------------- LISTENERS ---------------------------------------------------------------*/

// finaliza la compra
botonComprar.addEventListener("submit", (e) => {
  e.preventDefault();
  comprar();
});

/* --------------------------------------------------------------- INICIO ---------------------------------------------------------------*/

// cargo datos de un .json local
fetch(`./data/data.json`)
  .then((response) => response.json())
  .then((data) => {
    crearHtml(data, productos);

    // LISTENERS PARA FILTRAR USANDO LOS DATOS TRAIDOS DEL .JSON
    // ------------------- filtro por palabra
    search.addEventListener("input", () => {
      let filtro = filtrarNombre(data, search.value.toLowerCase());
      crearHtml(filtro, productos);
    });

    // ------------------- filtro por checkbox
    formCheckbox.addEventListener("change", () => {
      let arrFiltrado = [];

      // itero los checkbox tildados y devuelvo al array las categorias que coinciden
      categorias.forEach((categoria) => {
        if (formCheckbox[categoria].checked) {
          const filtro = filtrarCategoria(data, categoria);
          arrFiltrado = arrFiltrado.concat(filtro);
        }
      });

      // busqueda por palabra dentro de los checkbox tildados
      search.addEventListener("input", () => {
        arrFiltrado.length !== 0
          ? (arrFiltrado = arrFiltrado)
          : (arrFiltrado = data);
        const filtro = filtrarNombre(arrFiltrado, search.value.toLowerCase());
        crearHtml(filtro, productos);
      });

      arrFiltrado.length !== 0
        ? crearHtml(arrFiltrado, productos)
        : crearHtml(data, productos);
    });
  })

  // MANEJO EN CASO DE ERROR
  .catch((error) => {
    console.log(error);
    location.href(`https://http.cat/404`);
  });

actualizaDOMcarrito();

/* -------------------------------------------------------------------------------------------------- */
