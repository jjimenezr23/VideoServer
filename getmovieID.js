
const path = require('path');
const fs = require('fs');





let videoSize = 0;
let videoPath = '';

// obtuiene los datos del archivo json
function getDataFile(){

    let ListofData =[];
 
     let dataList = fs.readFileSync('./data.json', 'utf-8',
      (err, data)=>{
         if(err){
             return console.log(err);
         }
        console.log('se leyo perfecto');
      
         
    });
 
    ListofData = JSON.parse(dataList);
 
   
     
    
    return ListofData;
 
 }
 
 //devuelve el index y la lista de las peliculas;
 
  function getDataID(id) {
      let idfrom = getDataFile();
       
      let videodata ={};
      
     idfrom.find( video => {

         if(video.id === id){
          
           videodata = video;
          index = idfrom.indexOf(video);

          
          
         
 
      }

      sizeMovie = video.size;
      videoPath = video.routeMovie; 
     
      
     
     });

     return videodata;
    
  }


  module.exports = {
      getDataID,
      getDataFile,
     
  }
 
 