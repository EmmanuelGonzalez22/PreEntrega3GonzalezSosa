/*-------------------------- VARIABLES --------------------------*/

const checkBox = document.querySelectorAll(`input[type="checkbox"]`);

/*-------------------------- FUNCIONES --------------------------*/

// filtra por categoria
function filtrarCategoria(arr, filtro) {
  const encontrado = arr.filter((producto) => {
    return producto.categoria.includes(filtro);
  });
  return encontrado;
}

// filtra por nombre
function filtrarNombre(arr, filtro) {
  const encontrado = arr.filter((producto) => {
    return producto.nombre.includes(filtro);
  });
  return encontrado;
}

/*-------------------------- LISTENERS --------------------------*/

// busqueda por palabra
search.addEventListener("input", () => {
  let filtro = filtrarNombre(listado, search.value.toLowerCase());
  crearHtml(filtro, productos);
  agregarAlCarrito();
});

// busqueda por checkbox
checkBox.forEach((el) => {
  el.addEventListener("change", () => {
    if (el.checked) {
      let filtro = filtrarCategoria(listado, el.value);
      crearHtml(filtro, productos);
      agregarAlCarrito();
    } else {
      crearHtml(listado, productos);
      agregarAlCarrito();
    }
  });
});
