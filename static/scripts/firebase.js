// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXiwS1ZGrrWj8q_vM9mo273se5U32REgE",
    authDomain: "chat-pro-921d5.firebaseapp.com",
    projectId: "chat-pro-921d5",
    storageBucket: "chat-pro-921d5.appspot.com",
    messagingSenderId: "786332628612",
    appId: "1:786332628612:web:a02e2fd8c21563bf37b4d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const createUser = async (email, password) => {
    const  response = await createUserWithEmailAndPassword(auth, email, password)
    .then( userCredential => {
      const user = userCredential.user;
      return {
        error:false,
        data: user
      }
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        error:true,
        data: error
      }
    });
    return response;
}

const logIng =  async (email, password) => {
  const result = await signInWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    const user = userCredential.user;
    return {
      error:false,
      data: user
    }
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      error:true,
      data: error
    }
  })

  return result;

}

const loginGoogle =  async ()=>{
  const result = await signInWithPopup(auth,provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return {
      error:false,
      data:user
    }
  }).catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    const email  = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    return {
      error:true,
      data:error
    }
  });

  return result;
}

export {createUser,logIng,loginGoogle}