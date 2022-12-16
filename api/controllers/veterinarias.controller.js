const pgconnection = require('../connection/connection');

//Obteniendo veterinarias
const listarvet=async(req,res)=>{
    const consulta ='select * from veterinarias';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}

//Obteniendo numero de veterinarias segun su estado
const Countvetrerinarias=async(req,res)=>{
    const estado = req.params.estado;
    const consulta =' select count(*) from veterinarias where estado=$1 ';
    const response = await pgconnection.query(consulta,[estado]);
    res.json(response.rows)
}

//Obteniendo veterinaria por codvet

const listarvetByCodvet=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select * from veterinarias where codvet=$1';
    const response = await pgconnection.query(consulta,[codvet]);
    res.json(response.rows)
}

//Obteniendo los dueños de la veterinaria

const duenosveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select p.nombre, p.ap, p.am, p.foto from persona p, veterinarias vet, pervet pv  where (vet.codvet=$1) and (p.codper=pv.codper) and (vet.codvet=pv.codvet)';
    const response = await pgconnection.query(consulta,[codvet]);
    res.json(response.rows)
}
//Adicionar veterinaria
const addveterinaria=async(req,res)=>{
    const {nombre,telefono,lng,lat,foto,direccion,descripcion,fechacre,categoria} = req.body;
    const response=await pgconnection.query('insert into veterinarias(nombre,telefono,lng,lat,imagen,direccion,descripcion,fechacre,fechamod,codcategoria) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[
        nombre.toUpperCase(),
        telefono,
        lng,
        lat,
        foto,
        direccion.toUpperCase(),
        descripcion.toUpperCase(),
        fechacre,
        fechacre,
        categoria
    ]);
    res.json({mensaje:'Se adiciono satisfactoriamente'})
}

//Actualizar veterinaria
const updateveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    const {nombre,telefono,lng,lat,imagen,direccion,descripcion,fechamod,categoria} = req.body;
    const consulta='update veterinarias set nombre=$1, telefono=$2, lng=$3, lat=$4, imagen=$5, direccion=$6, descripcion=$7,fechamod=$8, codcategoria=$9 where codvet=$10'
    const response=await pgconnection.query(consulta,[
        nombre.toUpperCase(),
        telefono,
        lng,
        lat,
        imagen,
        direccion.toUpperCase(),
        descripcion.toUpperCase(),
        fechamod,
        categoria,
        codvet
    ]);
    res.json({mensaje:'Se actualizo satisfactoriamente'})
}


//Eliminar Veterinaria
const delveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    const response=await pgconnection.query('update veterinarias set estado=false, ac=false where codvet=$1',[
        codvet
    ]);
    res.json({mensaje:'Se dio de baja satisfactoriamente'})
}

//Habilitar Veterinaria

const habveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    console.log(codvet);
    const response=await pgconnection.query('update veterinarias set estado=true where codvet=$1',[
        codvet
    ]);
    res.json({mensaje:'Se habilito satisfactoriamente'})
}

//Asignar Persona a veterinaria
const asignarpervet=async(req,res)=>{
    try {
        const {codper,codvet} = req.body;
        const response=await pgconnection.query('insert into pervet(codper,codvet) values ($1,$2)',[
            codper,
            codvet
        ]);
        res.json({mensaje:'Se Asigno Satisfactoriamente'})
    } catch (error) {
        res.json({mensaje:'Error al guardar los datos'})
    }
}
//Eliminar Persona de veterinaria
const eliminarpervet=async(req,res)=>{
    try {
        const {codper,codvet} = req.body;
        console.log(codper,codvet);
        const response=await pgconnection.query('DELETE FROM pervet where codper=$1 and codvet=$2',[
            codper,
            codvet
        ]);
        res.json({mensaje:'Se elimino Satisfactoriamente'})
    } catch (error) {
        res.json({mensaje:'Error al guardar los datos'})
    }
}
//Listar veterinarias de un veterinario
const listarvetusu=async(req,res)=>{
    try {
    const codper = req.params.codper;
    const consulta='select v.codvet,v.nombre,v.imagen from veterinarias v,persona p, pervet pv where p.codper=$1 and p.codper=pv.codper and v.codvet=pv.codvet and (v.estado=true)';
    const response=await pgconnection.query(consulta,[codper]);
    res.json(response.rows)
    } catch (error) {
        res.json({mensaje:'Error al cargar los datos'})
    }
    
}

//Modulo para la app (abri y cerrar veterinaria)
const AbrirCerrarVet=async(req,res)=>{
    try {
    const {codvet,ac} = req.body;
    let mensaje='veterinaria abierta';
    if(!ac){mensaje='Veterinaria Cerrada'}
    const consulta='update veterinarias set ac=$1 where codvet=$2';
    const response=await pgconnection.query(consulta,[ac,codvet]);
    res.json({
        Mensaje:mensaje
    })
    } catch (error) {
        res.json({mensaje:'Error cambiar el estado'})
    }
    
}
//Modulo para la app (listar veterinarias abiertas)
const listarvetByAc=async(req,res)=>{
    try {
    const ac = req.params.ac;
    const consulta ='select * from veterinarias where ac=$1';
    const response = await pgconnection.query(consulta,[ac]);
    res.send(response.rows)
    } catch (error) {
        res.json({mensaje:'Error al obtener los datos'})
    }
    
}

//modulo para la app (modificar veterinaria)
const modvetapp=async(req,res)=>{
    try {
    const {codvet,atenciondom,descripcion,direccion,fechamod,horarioatencion,nombre,telefono,imagen} = req.body;
    const consulta ='update veterinarias set nombre=$1, telefono=$2, direccion=$3, descripcion=$4,fechamod=$5,atenciondom=$6,horarioatencion=$7,imagen=$8 where codvet=$9';
    const response = await pgconnection.query(consulta,[
        nombre.toUpperCase(),
        telefono,
        direccion.toUpperCase(),
        descripcion.toUpperCase(),
        fechamod,
        atenciondom,
        horarioatencion.toUpperCase(),
        imagen,
        codvet
    ]);
    res.json({
        mensaje:'Se actualizo satisfactoriamente'
    })
    } catch (error) {
        res.json({mensaje:'Error al obtener los datos'})
    }
    
}

//modulo para la app (listar veterinarias activas)
const listarvetByEstado=async(req,res)=>{
    const estado = req.params.estado;
    // const consulta ='select v.codvet,v.nombre,v.estado,v.direccion,v.imagen,v.ac,v.descripcion, v.horarioatencion, v.telefono, v.atenciondom,v.fechacre, v.fechamod, v.lat, v.lng, c.nombre as categoria from veterinarias v, categoria c where v.estado=$1 and v.codcategoria=c.codcategoria';
   // const consulta ='select avg(p.puntaje) as puntaje, v.codvet,v.nombre,v.estado,v.telefono,v.direccion,v.imagen,v.ac,v.atenciondom,c.nombre as categoria from puntaje p, veterinarias v, categoria c where v.codvet=p.codvet and c.codcategoria=v.codcategoria and p.estado=true and v.estado=$1 GROUP BY v.codvet,c.nombre order by puntaje desc';
   const consulta ="select v.codvet,v.nombre,v.estado,v.telefono,v.direccion,v.imagen,v.ac,v.atenciondom,c.nombre as categoria from veterinarias v, categoria c  where  c.codcategoria=v.codcategoria and v.estado=$1  GROUP BY v.codvet,c.nombre order by v.fechacre asc"; 
   const response = await pgconnection.query(consulta,[estado]);
    res.send(response.rows)
}



//Reportes de Veterinarias
const ReporteVeterinarias = async (req, res) => {
    const {estado, mes, codcategoria } = req.body;
    // console.log(estado,mes,codcategoria);

    // cuando estan seleccionados todos los parametros
    if(estado==0 && mes==13 && codcategoria==0){
        const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria)';
        const response = await pgconnection.query(consulta, []);
        res.json(response.rows)
    }
//cuando esta solo seleccionado el estado
    if(estado!=0 && mes==13 && codcategoria==0){
        const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (v.estado=$1)';
        const response = await pgconnection.query(consulta, [estado]);
        res.json(response.rows)
    }
//cuando esta solo seleccionado el mes
    if(estado==0 && mes!=13 && codcategoria==0){
        const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (extract(month from fechacre)=$1)';
        const response = await pgconnection.query(consulta, [mes]);
        res.json(response.rows)
    }
    
//cuando esta solo seleccionado la categoria
    if(estado==0 && mes==13 && codcategoria!=0){
        const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (v.codcategoria)=$1';
        const response = await pgconnection.query(consulta, [codcategoria]);
        res.json(response.rows)
    }

    //cuando esta seleccionado el estado y el mes   
if(estado!=0 && mes!=13 && codcategoria==0){
    const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (v.estado=$1) and (extract(month from fechacre)=$2)';
    const response = await pgconnection.query(consulta,[estado,mes]);
    res.json(response.rows)
}
//cuando esta seleccionado el estado y la categoria   
if(estado!=0 && mes==13 && codcategoria!=0){
    const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (v.estado=$1) and (v.codcategoria)=$2';
    const response = await pgconnection.query(consulta,[estado,codcategoria]);
    res.json(response.rows)
}

//cuando esta solo seleccionado el mes y categoria
if(estado==0 && mes!=13 && codcategoria!=0){
    const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (extract(month from fechacre)=$1) and (v.codcategoria=$2)';
    const response = await pgconnection.query(consulta, [mes,codcategoria]);
    res.json(response.rows)
}
    // cuando estan seleccionados todos los parametros
    if(estado!=0 && mes!=13 && codcategoria!=0){
        const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,v.estado,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno,c.nombre as categoria from veterinarias v,persona p, pervet pv, categoria c where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.codcategoria=c.codcategoria) and (v.estado=$1) and (extract(month from fechacre)=$2) and (v.codcategoria)=$3';
        const response = await pgconnection.query(consulta, [estado,mes,codcategoria]);
        res.json(response.rows)
    }

}
  
//aplicacion
const filtrarVeternarias=async(req,res)=>{
    const {adom,ac,categoria,estado} = req.body;
   // const consulta ='select avg(p.puntaje) as puntaje, v.codvet,v.nombre,v.estado,v.telefono,v.direccion,v.imagen,v.atenciondom,v.ac,c.nombre as categoria from puntaje p, veterinarias v, categoria c where v.codvet=p.codvet and c.codcategoria=v.codcategoria and p.estado=true and v.ac=$1 and v.atenciondom=$2 and c.codcategoria=$3 and v.estado=$4 GROUP BY v.codvet,c.nombre order by puntaje desc';
   const consulta ='select v.codvet,v.nombre,v.estado,v.telefono,v.direccion,v.imagen,v.atenciondom,v.ac,c.nombre as categoria from veterinarias v, categoria c where c.codcategoria=v.codcategoria and v.ac=$1 and v.atenciondom=$2 and c.codcategoria=$3 and v.estado=$4 GROUP BY v.codvet,c.nombre order by fechacre asc'; 
   const response = await pgconnection.query(consulta,[ac,adom,categoria,estado]);
    res.send(response.rows)
}

module.exports ={
    listarvet,
    addveterinaria,
    delveterinaria,
    habveterinaria,
    asignarpervet,
    listarvetByCodvet,
    duenosveterinaria,
    Countvetrerinarias,
    updateveterinaria,
    eliminarpervet,
    listarvetusu,
    AbrirCerrarVet,
    listarvetByAc,
    modvetapp,
    listarvetByEstado,
    ReporteVeterinarias,
    filtrarVeternarias
}    