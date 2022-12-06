//VARIABLES

let producto1 = 15;
let precioProducto1 = 4000;
let producto2 = 10;
let precioProducto2 = 4200;
let producto3 = 18;
let precioProducto3 = 3700;
let producto4 = 5;
let precioProducto4 = 5600;
let opcion = parseInt(
  prompt(
    "<----------> Bienvenido a E-Commerce <----------> \n\nSeleccione una opción: \n1- Consultar stock \n2- Realizar pedido \n0- Salir"
  )
);

//FUNCIONES

/* function bienvenida() { */
/* muestra el menu de bienvenida */
/*   return parseInt(
    prompt(
      "<----------> Bienvenido a E-Commerce <----------> \n\nSeleccione una opción: \n1- Consultar stock \n2- Realizar pedido \n0- Salir"
    )
  );
} */

while (opcion != 0) {
  switch (opcion) {
    case 1:
      if (opcion == 1) {
        let stock = prompt(
          "Producto 1: " +
            producto1 +
            "\n" +
            "Producto 2: " +
            producto2 +
            "\n" +
            "Producto 3: " +
            producto3 +
            "\n" +
            "Producto 4: " +
            producto4 +
            "\n" +
            "Presiona 1 para realizar pedido, cualquier otra tecla para volver"
        );
        if (stock == 1) {
          alert("pedido");
        }
      }
      break;
    case 2:
      let pedido = prompt(
        "Selecciona producto que desea comprar: \n 1- producto1\n 2- producto2\n 3- producto3\n 4- producto4"
      );
      switch (pedido) {
        case 1:
          alert("pedido1");
          break;
        case 2:
          alert("pedido2");
          break;
        case 3:
          alert("pedido3");
          break;
        case 4:
          alert("pedido4");
          break;
        default:
          alert("opcion no valida");
          break;
      }
      break;

    default:
      "opcion no valida";
      break;
  }
  opcion = parseInt(
    prompt(
      "<----------> Bienvenido a E-Commerce <----------> \n\nSeleccione una opción: \n1- Consultar stock \n2- Realizar pedido \n0- Salir"
    )
  );
}

alert("Gracias por su compra.");
