const express = require('express');
const router = express.Router();
const { listarcategorias } = require('../controllers/categorias.controller');
 router.get('/listarcategorias',listarcategorias); 
//  router.get('/listarproductosvet/:codvet',listarProductosVet);
//  router.get('/listarproductobyid/:codproducto',listarproductosById);
//  router.put('/modificarestadoproducto',modificarEstadoProducto);
//  router.put('/modificarproducto',modificarProducto);
//  router.get('/listarproductosvetcliente/:codvet',litarProductosVetCliente);
//  router.post('/adicionarproducto',adicionarProducto);
//  router.post('/asignarproductovet',asignarproductovet);
module.exports = router;