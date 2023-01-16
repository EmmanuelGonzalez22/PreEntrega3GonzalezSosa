/* ------------------------- PRODUCTOS ------------------------- */

// construye productos
function Producto(id, nombre, mascota, precio, stock, img, peso, edad) {
  this.id = id;
  this.nombre = nombre;
  this.mascota = mascota;
  this.precio = parseFloat(precio);
  this.stock = parseInt(stock);
  // valido si el producto tiene edad
  if (!edad) {
    this.edad = "-";
  } else {
    this.edad = edad;
  }
  // valido si el producto tiene peso
  if (!peso) {
    this.peso = "-";
  } else {
    this.peso = peso;
  }
  // valido si tiene imagen
  if (!img) {
    this.img = "###";
  } else {
    this.img = img;
  }
}

const camita40 = new Producto(
  1,
  "camita 40x40cm",
  "perro gato",
  2200,
  20,
  "camita40.jpg"
);
const camita60 = new Producto(
  2,
  "camita 60x50cm",
  "perro gato",
  3500,
  15,
  "camita50.jpg"
);
const camita90 = new Producto(
  3,
  "camita 90x90cm",
  "perro gato",
  4800,
  23,
  "camita90.jpg"
);
const dogSelectionPerroAdu = new Producto(
  4,
  "dog selection perro adulto x 21kg",
  "perro",
  4000,
  21,
  "DogSelectionPerroAdu.jpg",
  "21kg",
  "adulto"
);
const dogSelectionPerroCach = new Producto(
  5,
  "dog selection perro cachorro x 21kg",
  "perro",
  6200,
  18,
  "DogSelectionPerroCach.jpg",
  "21kg",
  "cachorro"
);
const eukanubaPerroAdu = new Producto(
  6,
  "eukanuba perro adulto x 15kg",
  "perro",
  6500,
  26,
  "EukanubaPerroAdu.jpeg",
  "15kg",
  "adulto"
);
const plato = new Producto(7, "plato", "perro gato", 1000, 22, "plato.jpg");
const platoGrande = new Producto(
  8,
  "plato grande",
  "perro gato",
  2000,
  15,
  "platoGrande.jpg"
);
const premiumGatoAdu = new Producto(
  9,
  "premium gato adulto x 15kg",
  "gato",
  6500,
  24,
  "PremiumGatoAdu.jpg",
  "15kg",
  "adulto"
);
const premiumPerroAdu = new Producto(
  10,
  "premium perro adulto x 20kg",
  "perro",
  6500,
  20,
  "PremiumPerroAdu.jpg",
  "20kg",
  "adulto"
);
const vitalCanGatoCach = new Producto(
  11,
  "vital can gato cachorro x 15kg",
  "gato",
  4500,
  18,
  "VitalCanGatoCach.png",
  "20kg",
  "cachorro"
);
const listado = [
  camita40,
  camita60,
  camita90,
  dogSelectionPerroAdu,
  dogSelectionPerroCach,
  plato,
  eukanubaPerroAdu,
  platoGrande,
  premiumGatoAdu,
  premiumPerroAdu,
  vitalCanGatoCach,
];
