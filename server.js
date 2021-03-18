
const express = require('express');
const bodyParser =  require('body-parser')
const app = express();
var http =require('http').Server(app)
var io = require('socket.io')(http)


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



var m = [{name: 'Alejandro', message:"Hi"},{name: 'Refae', message:"bye"}]


app.get('/messages', (req, res)=>{
    res.send(m)
})


app.post('/messages', (req, res)=>{
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

