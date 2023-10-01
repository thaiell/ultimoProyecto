import React from 'react'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../services/config';

const ContinueWithGoogle = () => {


    const GoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
        .then(()=>console.log("exito"))
        .catch((error)=>console.log(error))
    }

  return (
    <button onClick={GoogleSignIn}
    style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-evenly",
      fontSize:"15px",
      backgroundColor:"white",
      border:"1px solid grey",
      borderRadius:"5px", 
      width:"250px",
      margin:"0 auto",
      cursor:"pointer"}}>
      <img 
    style={{width:"30px"}}
    src="../../img/pngwing.com.png" alt="" />
    Continuar con Google
    </button>    
    
  )
}

export default ContinueWithGoogle

/* getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(token);
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }); */