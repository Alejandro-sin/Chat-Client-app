/* 

Backend!

Hay un conjunto de fucniones que me permiten acceder a express y mostrar contenido 
estático. También puedo acceder a la dirección del IPV6

*/

const express = require('express');
// Será Middleware, intermediario para parsear los datos.
const bodyParser =  require('body-parser')
const app = express();
var cors =require('cors')


// Configurando Sockeios
var http =require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

// Crearemos un sericio de getMesseages como endpoint
/*Conseguiremos de nuestro backen y frotn mensaje, usares get request
*/

var m = [{name: 'Alejandro', message:"Hi"},{name: 'Refae', message:"bye"}]

app.get('/messages', (req, res)=>{
    res.send(m)
})


app.post('/messages', (req, res)=>{
    //console.log(req.body)
    // Agregamos mensajes al arreglo
    m.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket)=>{
    console.log("A user conected")
})


const server = http.listen(8080, ()=>{
    console.log("Server listen at:", server.address().port)
});

