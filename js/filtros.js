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
/* search.addEventListener("input", () => {
  let filtro = filtrarNombre(listado, search.value.toLowerCase());
  crearHtml(filtro, productos);
  agregarAlCarrito();
}); */

// busqueda por checkbox
/* formCheckbox.addEventListener("change", () => {
  let arrFiltrado = [];

  // itero los checkbox tildados y devuelvo al array las categorias que coinciden
  categorias.forEach((categoria) => {
    if (formCheckbox[categoria].checked) {
      const filtro = filtrarCategoria(listado, categoria);
      arrFiltrado = arrFiltrado.concat(filtro);
    }
  });

  // busqueda por palabra dentro de los checkbox tildados
  search.addEventListener("input", () => {
    arrFiltrado.length !== 0
      ? (arrFiltrado = arrFiltrado)
      : (arrFiltrado = listado);
    const filtro = filtrarNombre(arrFiltrado, search.value.toLowerCase());
    crearHtml(filtro, productos);
    agregarAlCarrito();
  });

  arrFiltrado.length !== 0
    ? crearHtml(arrFiltrado, productos)
    : crearHtml(listado, productos);

  agregarAlCarrito();
}); */
