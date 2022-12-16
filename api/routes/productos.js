const express = require('express');
const router = express.Router();
const { listarProductosVet, listarproductos, listarproductosById, modificarEstadoProducto, modificarProducto, litarProductosVetCliente, adicionarProducto, asignarproductovet } = require('../controllers/productos.controller');
 router.get('/listarproductos',listarproductos); 
 router.get('/listarproductosvet/:codvet',listarProductosVet);
 router.get('/listarproductobyid/:codproducto',listarproductosById);
 router.put('/modificarestadoproducto',modificarEstadoProducto);
 router.put('/modificarproducto',modificarProducto);
 router.get('/listarproductosvetcliente/:codvet',litarProductosVetCliente);
 router.post('/adicionarproducto',adicionarProducto);
 router.post('/asignarproductovet',asignarproductovet);
// router.post('/addrolpro',addrolpro);
// router.put('/estadorol',Cambiarestado);
// router.put('/updaterol',actualizarRol);

module.exports = router;