const pgconnection = require('../connection/connection');
// const listaAnuncios=async(req,res)=>{
//     const consulta ='select a.codanuncio,a.titulo,a.texto,a.imagen as imganuncio ,a.estado,v.nombre,v.imagen from anuncio a , veterinarias v, vetanuncio va where (va.codvet=v.codvet) and (va.codanuncio=a.codanuncio)';
//     const response = await pgconnection.query(consulta);
//     res.send(response.rows)
// }

const listaPuntuacionesVet=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select per.nombre,per.ap,per.am,per.foto,p.puntaje,p.comentario,p.fecha from usuario u, persona per, veterinarias vet,puntaje p where vet.codvet=$1 and u.codper=per.codper and p.codvet=vet.codvet and u.login=p.login and p.estado=true ORDER BY p.fecha DESC';
    const response = await pgconnection.query(consulta,[codvet]);
    res.send(response.rows)
}

const ratingExist=async(req,res)=>{
    const {login,codvet} = req.body;
    const consulta ='select count(*) where exists (select * from puntaje where login=$1 and codvet=$2)';
    const response = await pgconnection.query(consulta,[login,codvet]);
    res.json(response.rows)
}

const listarRatingById=async(req,res)=>{
    const {login,codvet} = req.body;
    const consulta ='select * from puntaje where (login=$1) and (codvet=$2)';
    const response = await pgconnection.query(consulta,[login,codvet]);
    res.send(response.rows)
}

// const CambiarEstadoAnuncio=async(req,res)=>{
//     const {codanuncio,estado} = req.body;
//     const consulta ='update anuncio set estado=$1 where codanuncio=$2';
//     const response = await pgconnection.query(consulta,[estado,codanuncio]);
//     res.json({
//         mensaje:'Se cambio el estado satisfactoriamente'
//     })
// }
const addrating=async(req,res)=>{
    const {puntaje, comentario, login, codvet, fecha} = req.body;
    const consulta ='insert into puntaje(login,codvet,puntaje,fecha,comentario) values ($1,$2,$3,$4,$5)';
    const response = await pgconnection.query(consulta,[login,codvet,puntaje,fecha,comentario.toUpperCase()]);
      res.json({
       mensaje:'gracias por tu calificacion'
      })
}

// const asignarAnuncioaVet=async(req,res)=>{
//     const {codvet,codanuncio} = req.body;
//     const consulta ='insert into vetanuncio(codvet,codanuncio) values ($1,$2)';
//     const response = await pgconnection.query(consulta,[codvet,codanuncio]);
//     res.json({mensaje:'Se creo satisfactoriamente'});
// }

const modRating=async(req,res)=>{
    const {puntaje,comentario,login,codvet,fecha,estado} = req.body;
    const consulta ='update puntaje set puntaje=$1,fecha=$2,comentario=$3,estado=$4 where login=$5 and codvet=$6';
    const response = await pgconnection.query(consulta,[puntaje,fecha,comentario.toUpperCase(),estado,login,codvet]);
    res.json({mensaje:'calificacion modificada'});
}


module.exports ={
   addrating,
   listaPuntuacionesVet,
   ratingExist,
   listarRatingById,
   modRating
}

   