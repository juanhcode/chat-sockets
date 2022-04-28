const socket = io();
const sendBtn = document.getElementById('send');
const dashboard = document.getElementById('dashboard');
const box = document.getElementById('box');

const mostrarMensaje = (user,message) => {
    dashboard.innerHTML+=`<b>${user}: </b> ${message}<br>`;

}

sendBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')).email;
    const message = document.getElementById('message').value;
    console.log(user,message);
    if(message !== ''){
        socket.emit('chat:message',{user,message,room:'academia'});
    }else{
        alert('Escribe algo')
    }
})

socket.on('chat:message',data=>{
    const {user,message} = data;
    mostrarMensaje(user,message);
})