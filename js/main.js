/* //--------------------------------------------------------------- VARIABLES */

// construye productos
function Producto(nombre, mascota, precio, stock, peso, edad) {
  this.nombre = nombre;
  this.mascota = mascota;
  this.precio = parseFloat(precio);
  this.stock = parseInt(stock);
  this.peso = peso;
  this.edad = edad;
  // valido si el producto tiene peso
  if (!peso) {
    this.peso = "-";
  } else {
    this.peso = peso;
  }
  // valido si el producto tiene edad
  if (!edad) {
    this.edad = "-";
  } else {
    this.edad = edad;
  }
}

const premiumPerroAduGr = new Producto(
  "Premium Perro Adulto x 20kg",
  "perro",
  7000,
  20,
  "20kg",
  "adulto"
);
const premiumPerroCachGr = new Producto(
  "Premium Perro Cachorro x 20kg",
  "perro",
  7500,
  15,
  "20kg",
  "cachorro"
);
const premiumPerroAduCh = new Producto(
  "Premium Perro Adulto x 8kg",
  "perro",
  3800,
  23,
  "8kg",
  "adulto"
);
const premiumPerroCachCh = new Producto(
  "Premium Perro Cachorro x 8kg",
  "perro",
  4000,
  21,
  "8kg",
  "cachorro"
);
const premiumGatoAduGr = new Producto(
  "Premium Gato adulto x 20kg",
  "gato",
  6200,
  18,
  "20kg",
  "adulto"
);
const premiumGatoCachGr = new Producto(
  "Premium Gato cachorro x 20kg",
  "gato",
  6500,
  26,
  "20kg",
  "adulto"
);
const premiumGatoAduCh = new Producto(
  "Premium Gato adulto x 8kg",
  "gato",
  7000,
  22,
  "8kg",
  "cachorro"
);
const premiumGatoCachCh = new Producto(
  "Premium Gato cachorro x 8kg",
  "gato",
  7000,
  15,
  "8kg",
  "cachorro"
);

const listado = [
  premiumPerroAduGr,
  premiumPerroAduCh,
  premiumPerroCachGr,
  premiumPerroCachCh,
  premiumGatoAduGr,
  premiumGatoAduCh,
  premiumGatoCachGr,
  premiumGatoCachCh,
];
const carrito = [];
let precioFinal = 0;
/* //--------------------------------------------------------------- FUNCIONES */

/* muestra el menu de bienvenida */
function bienvenida() {
  return parseInt(
    prompt(
      "<----------> Bienvenido a Pet´s BRC Online <----------> \n\nSeleccione una opción: \n1- Consultar stock \n2- Realizar pedido \n3- Filtrar busqueda por precio \n0- Salir"
    )
  );
}

/* descuenta la cantidad de producto que solicita el cliente */
const restaStock = function (cantCompra, productoStock) {
  if (cantCompra <= productoStock && cantCompra > 0) {
    productoStock = productoStock - cantCompra;
  } else if (cantCompra <= 0) {
    alert("Cantidad no válida");
  } else {
    alert("No disponemos de stock. Stock disponible: " + productoStock);
  }
  return productoStock;
};

// calcula el precio de la compra, y lo suma a un total
const calculaPrecio = function (cantCompra, precio, productoStock) {
  if (cantCompra <= productoStock && cantCompra >= 0) {
    precioFinal += cantCompra * precio;
  } else {
    precioFinal += 0;
  }
  return precioFinal;
};

// agrega un producto al carrito
const agregarCarrito = function (arr, producto, pedido, stock) {
  if (pedido <= stock && pedido > 0) {
    return (arr += arr.push(producto + " x" + pedido + " unidad/es"));
  }
};

// filtra por precio
function filtrarPrecio(arr, filtro) {
  const encontrado = arr.filter((producto) => {
    return producto.precio <= parseFloat(filtro);
  });
  return encontrado;
}

//termina la compra
function pagar() {
  if (carrito != "") {
    let nombreTarjeta = prompt(
      "Ingrese nombre como figura en su tarjeta de credito: \n\nIngrese 0 para cancelar"
    );
    let cvvTarjeta = prompt(
      "Ingrese el cvv como figura en su tarjeta de credito: \n\nIngrese 0 para cancelar"
    );
    alert("Gracias por su compra.");
    carrito.splice(0, carrito.length);
    console.log(carrito);
    precioFinal = 0;
  }
}

/* //--------------------------------------------------------------- LOGICA */

let opcion = bienvenida();

while (opcion != "0") {
  if (opcion == "1") {
    let stock = prompt(
      premiumPerroAduGr.nombre +
        " = " +
        premiumPerroAduGr.stock +
        " unidades" +
        "\n" +
        premiumPerroAduCh.nombre +
        " = " +
        premiumPerroAduCh.stock +
        " unidades" +
        "\n" +
        premiumGatoAduGr.nombre +
        " = " +
        premiumGatoAduGr.stock +
        " unidades" +
        "\n" +
        premiumGatoAduCh.nombre +
        " = " +
        premiumGatoAduCh.stock +
        " unidades" +
        "\n" +
        "Presiona cualquier tecla para volver"
    );
  } else if (opcion == "2") {
    let pedido = prompt(
      "Selecciona el numero de producto que desea comprar: \n 1- " +
        premiumPerroAduGr.nombre +
        " --> precio por unidad $" +
        premiumPerroAduGr.precio +
        "\n 2- " +
        premiumPerroAduCh.nombre +
        " --> precio por unidad $" +
        premiumPerroAduCh.precio +
        "\n 3- " +
        premiumGatoAduGr.nombre +
        " --> precio por unidad $" +
        premiumGatoAduGr.precio +
        "\n 4- " +
        premiumGatoAduCh.nombre +
        " --> precio por unidad $" +
        premiumGatoAduCh.precio +
        "\n\n presiona 0 para finalizar compra"
    );
    while (pedido != "0") {
      let cantidadCompra;
      switch (pedido) {
        case "1":
          cantidadCompra = parseInt(
            prompt(
              "Cuantos desea comprar? Stock disponible: " +
                premiumPerroAduGr.stock
            )
          );
          agregarCarrito(
            carrito,
            premiumPerroAduGr.nombre,
            cantidadCompra,
            premiumPerroAduGr.stock
          );
          precioFinal = calculaPrecio(
            cantidadCompra,
            premiumPerroAduGr.precio,
            premiumPerroAduGr.stock
          );
          premiumPerroAduGr.stock = restaStock(
            cantidadCompra,
            premiumPerroAduGr.stock
          );
          break;
        case "2":
          cantidadCompra = parseInt(
            prompt(
              "Cuantos desea comprar? Stock disponible: " +
                premiumPerroAduCh.stock
            )
          );
          agregarCarrito(
            carrito,
            premiumPerroAduCh.nombre,
            cantidadCompra,
            premiumPerroAduCh.stock
          );
          precioFinal = calculaPrecio(
            cantidadCompra,
            premiumPerroAduCh.precio,
            premiumPerroAduCh.stock
          );
          premiumPerroAduCh.stock = restaStock(
            cantidadCompra,
            premiumPerroAduCh.stock
          );
          break;
        case "3":
          cantidadCompra = parseInt(
            prompt(
              "Cuantos desea comprar? Stock disponible: " +
                premiumGatoAduGr.stock
            )
          );
          agregarCarrito(
            carrito,
            premiumGatoAduGr.nombre,
            cantidadCompra,
            premiumGatoAduGr.stock
          );
          precioFinal = calculaPrecio(
            cantidadCompra,
            premiumGatoAduGr.precio,
            premiumGatoAduGr.stock
          );
          premiumGatoAduGr.stock = restaStock(
            cantidadCompra,
            premiumGatoAduGr.stock
          );
          break;
        case "4":
          cantidadCompra = parseInt(
            prompt(
              "Cuantos desea comprar? Stock disponible: " +
                premiumGatoAduCh.stock
            )
          );
          agregarCarrito(
            carrito,
            premiumGatoAduCh.nombre,
            cantidadCompra,
            premiumGatoAduCh.stock
          );
          precioFinal = calculaPrecio(
            cantidadCompra,
            premiumGatoAduCh.precio,
            premiumGatoAduCh.stock
          );
          premiumGatoAduCh.stock = restaStock(
            cantidadCompra,
            premiumGatoAduCh.stock
          );
          break;
        default:
          alert("Opción no válida");
          break;
      }

      pedido = prompt(
        "Selecciona el numero de producto que desea comprar: \n 1- " +
          premiumPerroAduGr.nombre +
          " --> precio por unidad $" +
          premiumPerroAduGr.precio +
          "\n 2- " +
          premiumPerroAduCh.nombre +
          " --> precio por unidad $" +
          premiumPerroAduCh.precio +
          "\n 3- " +
          premiumGatoAduGr.nombre +
          " --> precio por unidad $" +
          premiumGatoAduGr.precio +
          "\n 4- " +
          premiumGatoAduCh.nombre +
          " --> precio por unidad $" +
          premiumGatoAduCh.precio +
          "\n\nTOTAL= $" +
          precioFinal +
          "\n\n Presiona 0 para finalizar compra"
      );
    }
    if (carrito != 0) {
      alert(`Este es su carrito de compras: \n\n ${carrito}`);
    }
    if (precioFinal != "") {
      alert("Valor total de su compra: $" + precioFinal);
    }
    console.log(carrito);
    pagar();
  } else if (opcion == "3") {
    const entradaFiltro = parseFloat(prompt("Ingrese monto maximo a pagar: "));
    const filtrado = filtrarPrecio(listado, entradaFiltro);
    alert(filtrado);
    console.log(filtrado);
  } else {
    alert("Opción no válida");
  }

  opcion = bienvenida();
}
alert("Gracias por su visita.");
