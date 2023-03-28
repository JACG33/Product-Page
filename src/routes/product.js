const express = require('express')
const app=express.Router()

app.get('/products', (req, res) => {
  // res.json(products)
  res.send('Obteniendo productos')
})

app.post('/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body }
  products.push(newProduct)
  res.send(newProduct)
})

app.put('/products/:id', (req, res) => {
  const newData = req.body
  const producFound = products.find((product) => product.id === parseInt(req.params.id))
  if (!producFound) return res.status(404).json({ "message": "Producto no encontrado" })

  products = products.map((product) => product.id === parseInt(req.params.id) ? { ...product, newData } : product)
  res.json({ "message": "Producto Actualizado" })
})

app.delete('/products/:id', (req, res) => {
  const producFound = products.find((product) => product.id === parseInt(req.params.id))
  if (!producFound) return res.status(404).json({ "message": "Producto no encontrado" })

  products = products.filter((product) => product.id !== parseInt(req.params.id))
  res.status(204)
})

app.get('/products/:id', (req, res) => {
  const producFound = products.find((product) => product.id === parseInt(req.params.id))
  if (!producFound) return res.status(404).json({ "message": "Producto no encontrado" })
  res.json(producFound)
})

module.exports=app
