import {createUser,logIng,loginGoogle} from './firebase.js'
const formRegistration = document.getElementById('form-registration');
const form_login = document.getElementById('form-login');
const btn_google = document.getElementById('btn-google');
if (formRegistration !== null) {
    formRegistration.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const {error,data} = await createUser(email, password);
        console.log(error);
        console.log(data);
        if (error) {
            switch (data.code) {
                case 'auth/email-already-in-use':
                    alert('Correo registrado')
                    break;
                case 'auth/weak-password':
                    alert('Contraseña debe ser de mínimo 6 caracteres');
                    break;
                default:
                    alert('ERROR');
                    break;
            }
        } else {
            alert('Usuaro registrado correctamente');
            window.location.href = '/login.html'
        }
    })
}


if (form_login !== null){
    form_login.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email,password);
        const {error,data} = await logIng(email, password);
        if (error) {
            switch (data.code) {
                case 'auth/wrong-password':
                    alert('Contraseña incorrecta')
                    break;
                case 'auth/user-not-found':
                    alert('Correo no registrado');
                    break;
                default:
                    alert('ERROR');
                    break;
            }
        } else {
            alert('Inicio sesion correctamente');
            localStorage.setItem('user',JSON.stringify({
                email:data.email,
                uid:data.uid
            }))
            window.location.href="/chat.html"
        }
    })
} 

if(btn_google != null){
    btn_google.addEventListener('click',async (e)=>{
        const {error,data}  = await loginGoogle();
        if(error) {
            alert('error')
        }else{
            localStorage.setItem('user',JSON.stringify({
                email:data.email,
                uid:data.uid
            }))
            window.location.href="/chat.html"
        }
    })
}