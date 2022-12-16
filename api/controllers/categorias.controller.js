const pgconnection = require('../connection/connection');
//listar categorias
const listarcategorias=async(req,res)=>{
    // const codvet = req.params.codvet;
    const consulta ='select * from categoria order by nombre asc';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}
//listar productos de veterinarias desde el cliente
// const litarProductosVetCliente=async(req,res)=>{
//     const codvet = req.params.codvet;
//     const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod,v.telefono from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto and v.codvet=$1 and p.estado=true';
//     const response = await pgconnection.query(consulta,[codvet]);
//     res.send(response.rows)
// }
//listar productos de todas las veterinarias (no implementado!!!)
// const listarproductos=async(req,res)=>{
//     const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto';
//     const response = await pgconnection.query(consulta);
//     res.send(response.rows)
// }
//listar producto pos codproducto
// const listarproductosById=async(req,res)=>{
//     const codproducto = req.params.codproducto;
//     const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod,v.codvet from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto and p.codproducto=$1';
//     const response = await pgconnection.query(consulta,[codproducto]);
//     res.send(response.rows)
    
// }
//modificando estado del producto
// const modificarEstadoProducto=async(req,res)=>{
//     const {codproducto,estado}=req.body;
//     const consulta ='UPDATE producto SET estado = $1 WHERE codproducto = $2';
//     const response = await pgconnection.query(consulta,[estado,codproducto]);
//     // res.send(response.rows)
//     if(estado){
//         res.json({
//             'mensaje':'Se habilito el producto'
//         })
//     }else{
//         res.json({
//             'mensaje':'Se inhabilito el producto'
//         })
//     }
// }
//adicionar producto
// const adicionarProducto=async(req,res)=>{
//     const {nombre,precio,descripcion,cantidad,fecha,imagen}=req.body;
//     console.log(nombre,precio,descripcion,cantidad,fecha,imagen);
//     const consulta ='insert into producto(nombre,precio,descripcion,cantidad,imagen,fechacre,fechamod) values ($1,$2,$3,$4,$5,$6,$7) RETURNING codproducto';
//     const response = await pgconnection.query(consulta,[nombre.toUpperCase(),precio,descripcion.toUpperCase(),cantidad.toUpperCase(),imagen,fecha,fecha]);
//     res.json(response.rows);
// }
//adicionar producto a veterinaria
// const asignarproductovet=async(req,res)=>{
//     const {codvet,codproducto} = req.body;
//     const consulta ='insert into vetpro(codvet,codproducto) values ($1,$2)';
//     const response = await pgconnection.query(consulta,[codvet,codproducto]);
//     res.json({mensaje:'Se creo satisfactoriamente'});
// }
// //modificar producto
// const modificarProducto=async(req,res)=>{
//     const {codproducto,nombre,precio,descripcion,cantidad,fechamod,imagen}=req.body;
//     const consulta ='UPDATE producto SET  nombre=$1, precio=$2, descripcion=$3, cantidad=$4, fechamod=$5,imagen=$6 WHERE codproducto = $7';
//     const response = await pgconnection.query(consulta,[nombre.toUpperCase(),precio,descripcion.toUpperCase(),cantidad.toUpperCase(),fechamod,imagen,codproducto]);
//     res.json({
//         'mensaje':`se actualizo ${nombre} satisfactoriamente`
//     })
// }


module.exports ={
   listarcategorias
 }    
//  select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod
//  from producto p, vetpro vp, veterinarias v 
//  where v.codvet=vp.codvet and p.codproducto=vp.codproducto and v.codvet=100