import { signOut } from "firebase/auth"
import { auth } from "../../services/config"
const SignOutUser = () => {
  
  
const signOutHandler = async () => {
await auth.signOut()
  .then(()=> console.log("Cerraste sesion correctamente"))
  .catch((error) => console.log(error))
}  
  
  return (
    <button onClick={signOutHandler}>LogOut</button>
  )
}

export default SignOutUser