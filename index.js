const path = require('path');
const http = require('http');
const fs = require('fs');
const express = require('express');
const { getRouteOfMovie } = require('./guardarData');
const { getDataID, getDataFile,  } = require('./getmovieID');



const app = express();

//let headers = header();
let moviePath = '';


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });





//ruta de folder con videos
let urlpeli = '/home/dev/Videos/peli';




getRouteOfMovie(urlpeli);







app.get('/listaMovie',(req, res)=>{

    
      
     res.json(getDataFile());



});





app.get('/moviebyid/:id', (req, res)=>{

let id = req.params.id;



let dataMovie = getDataID(id);

moviePath = dataMovie.routeMovie;
console.log(moviePath);

 res.json(dataMovie);


});


app.get('/video/:id', (req, res)=>{


  // Ensure there is a range given for the video
  const range = req.headers.range;
  
  const id = req.params.id;


  let dataMovie = getDataID(id);
  
  videoPath = dataMovie.routeMovie;


  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);


  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);


});







 




app.listen(3000, ()=>{
    console.log('corriendo');
})





//'/home/dev/Videos/peli' 




/*

let system = os.arch();
console.log(system);

let system2 = os.cpus();
console.log(system2);

let system3 = os.homedir();
console.log(system3);

let system4 = os.freemem();
console.log(system4);

let system5 = os.networkInterfaces();
console.log(system5);


*/