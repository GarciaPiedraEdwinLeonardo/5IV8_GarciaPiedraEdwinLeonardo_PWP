var http = require('http');

//vamos a crear nuestro propio servidor

var servidor = http.createServer(function(req,res){
        //req request => es una solicitud viene por parte de la arquitectura cliente-servidor, todos los clientes (navegadores, usuarios, aplicaciones, servicios,etc), son lo que realizan una peticion por parte del protocolo
        //res => response es la respuesta que el servidor le da al cliente

        res.writeHead(200, {'content-type' : 'text/html; charset = utf-8'});
        res.write('<h1>Hola mundo desde  Node.js</h1>');
        res.write('<h1>A mimir</h1>');
        res.write('<h1>A mimir x2</h1>')
        console.log("Hola si entro al servidor");
        res.end();
});

//Es necesario tener un puerto de comunicacion para el servidor
servidor.listen(3000);

console.log('Server ejecutandose en http://localhost:3000');