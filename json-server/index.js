const express = require("express");
const app = express();

var cors = require("cors");

app.use(cors());

let jsonData = require("./db.json");

app.get("/", function (req, res) {
  res.send(jsonData);
});

app.get("/api/products", function (req, res) {
  res.send(jsonData.products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id
  const product = jsonData.products.find(p => p.id.toString() === id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
})

app.listen(3000, function () {
  console.log("Aplicación de pruebas escuchando en el puerto 3000!");
});
