const path = require('path');
const fs = require('fs');








//ruta de folder con videos
//let urlpeli = '/home/dev/Videos/peli';





 // get the folder router
const getRouteOfMovie = (routeMovie) => {


// recibir el la ruta de cada video

let ListadoMovie = [];
//verifica si es un es un archivo o folder 
const isFile = filename => {
    return fs.lstatSync(filename).isFile();
}


//escanea el folder 
let folder = fs.readdirSync(routeMovie).map(
   filename => {
       return path.join(routeMovie, filename);

    }
).filter(isFile);


folder.map(item => {
    
   let name = path.basename(item);
   let type = path.extname(item);
   let size = fs.statSync(item).size;


    let meObjeto={
        id: name,
        name,
        routeMovie: item,
        type,
        size,
        img: 'no asignada'
    }

    ListadoMovie.push(meObjeto);

    let data = JSON.stringify(ListadoMovie);
    guardarDb(data);

});


}


 
function guardarDb(algo =''){

   
   
        fs.writeFileSync('data.json', `${algo}\n`, (err)=>{
        if(err) throw new Error('No se pudo grabar');
        console.log('archivo grabado');
    });
    
 
   
}






module.exports = {
    getRouteOfMovie,
}





