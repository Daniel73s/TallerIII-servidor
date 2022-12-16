const pgconnection = require('../connection/connection');
//listar productos de una veterinaria
const listarProductosVet=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod,p.umedida,v.telefono from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto and v.codvet=$1';
    const response = await pgconnection.query(consulta,[codvet]);
    res.send(response.rows)
}
//listar productos de veterinarias desde el cliente
const litarProductosVetCliente=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod,p.umedida,v.telefono from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto and v.codvet=$1 and p.estado=true';
    const response = await pgconnection.query(consulta,[codvet]);
    res.send(response.rows)
}
//listar productos de todas las veterinarias (no implementado!!!)
const listarproductos=async(req,res)=>{
    const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}
//listar producto pos codproducto
const listarproductosById=async(req,res)=>{
    const codproducto = req.params.codproducto;
    const consulta ='select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod,p.umedida,v.codvet from producto p, vetpro vp, veterinarias v where v.codvet=vp.codvet and p.codproducto=vp.codproducto and p.codproducto=$1';
    const response = await pgconnection.query(consulta,[codproducto]);
    res.send(response.rows)
    
}
//modificando estado del producto
const modificarEstadoProducto=async(req,res)=>{
    const {codproducto,estado}=req.body;
    const consulta ='UPDATE producto SET estado = $1 WHERE codproducto = $2';
    const response = await pgconnection.query(consulta,[estado,codproducto]);
    // res.send(response.rows)
    if(estado){
        res.json({
            'mensaje':'Se habilito el producto'
        })
    }else{
        res.json({
            'mensaje':'Se inhabilito el producto'
        })
    }
}
//adicionar producto
const adicionarProducto=async(req,res)=>{
    const {nombre,precio,descripcion,peso,fecha,imagen,umedida}=req.body;
    console.log(nombre,precio,descripcion,peso,fecha,imagen,umedida);
    const consulta ='insert into producto(nombre,precio,descripcion,cantidad,imagen,fechacre,fechamod,umedida) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING codproducto';
    const response = await pgconnection.query(consulta,[nombre.toUpperCase(),precio,descripcion.toUpperCase(),peso.toUpperCase(),imagen,fecha,fecha,umedida.toUpperCase()]);
    res.json(response.rows);

    // res.json({
    //     'mensaje':`se creo ${nombre} satisfactoriamente`
    // })
}
//adicionar producto a veterinaria
const asignarproductovet=async(req,res)=>{
    const {codvet,codproducto} = req.body;
    const consulta ='insert into vetpro(codvet,codproducto) values ($1,$2)';
    const response = await pgconnection.query(consulta,[codvet,codproducto]);
    res.json({mensaje:'Se creo satisfactoriamente'});
}
//modificar producto
const modificarProducto=async(req,res)=>{
    const {codproducto,nombre,precio,descripcion,cantidad,fechamod,imagen,umedida}=req.body;
    const consulta ='UPDATE producto SET  nombre=$1, precio=$2, descripcion=$3, cantidad=$4, fechamod=$5,imagen=$6,umedida=$7 WHERE codproducto = $8';
    const response = await pgconnection.query(consulta,[nombre.toUpperCase(),precio,descripcion.toUpperCase(),cantidad.toUpperCase(),fechamod,imagen,umedida.toUpperCase(),codproducto]);
    res.json({
        'mensaje':`se actualizo ${nombre} satisfactoriamente`
    })
}


module.exports ={
    listarProductosVet,
    listarproductos,
    listarproductosById,
    modificarEstadoProducto,
    modificarProducto,
    litarProductosVetCliente,
    adicionarProducto,
    asignarproductovet
 }    
//  select p.codproducto,p.nombre, p.precio, p.descripcion, p.imagen, p.estado, p.cantidad,p.fechacre,p.fechamod
//  from producto p, vetpro vp, veterinarias v 
//  where v.codvet=vp.codvet and p.codproducto=vp.codproducto and v.codvet=100