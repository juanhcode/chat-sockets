const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


//Librerias webSockets
const {createServer} = require('http');
const {Server} = require('socket.io');


//Instancia
const app = express();

//Dotenv
require('dotenv').config();

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//Variables
app.set('PORT', process.env.PORT || 4050);
const httpServer = createServer(app);
const io = new Server(httpServer,{/*Opciones*/});


app.get('',(req, res) => {
    res.sendFile(path.join(__dirname, './static/registration.html'));
})


/*Logica del socket*/
io.on('connection',socket=>{
    console.log(socket.id);
    socket.join('academia');
    socket.on('chat:message',data=>{
        console.log(data);
        //Compartir mensaje a otros usuarios
        io.emit('chat:message',data);
        //io.to(data.room).emit('chat:message',data);
    })
})

httpServer.listen(app.get('PORT'),()=>{
    console.log("Corriendo");
})




