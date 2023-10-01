import { useState } from "react"
import { randomGeneratorOfNumbersAndLetters } from "../../Hooks/Hooks";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../services/config";

const MassiveUploadUsers = () => {

const [usersQuantity, setUsersQuantity] = useState(1);
const [users, setUsers] = useState([]);

const handleUserInputChange = (index, key, value) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], [key]: value };
    setUsers(updatedUsers);
  };

const additionalInputs = [];
  



for (let i = 0; i < usersQuantity; i++) {
/*     const randomPassword = randomGeneratorOfNumbersAndLetters(6);  */
    
    additionalInputs.push(
      <div key={i} className="eachUserInfo">
        <input
          type="text"
          placeholder={`Nombre del Usuario ${i + 1}`}
          onChange={(e) => handleUserInputChange(i, "name", e.target.value)}
        />
        <input
          type="email"
          placeholder={`Email del Usuario ${i + 1}`}
          onChange={(e) => handleUserInputChange(i, "email", e.target.value)}
        />


      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();



    const usersWithPasswords = users.map((user) => ({
        ...user,
        password: randomGeneratorOfNumbersAndLetters(6),
      }));


    console.log("Usuarios registrados:", usersWithPasswords);
   
const promises = usersWithPasswords.map(async (user) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
  
    console.log(`Usuario registrado: ${userCredential.user.email}`)

    await updateProfile(userCredential.user, {
      displayName: user.name
    })

    console.log(userCredential);
  } catch (error) {
    console.error(`Error al registrar al usuario: ${error.message}`);
  }
})
  }
    /* const promises = usersWithPasswords.map( async (user) => {
        return await createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            // Aquí puedes realizar cualquier acción adicional con 'userCredential.user'
            console.log(`Usuario registrado: ${userCredential.user.email}`);
          
          
            console.log(userCredential)
          
          })
          .catch((error) => {
            console.error(`Error al registrar al usuario: ${error.message}`);
          });
      });
  
      try {
        await Promise.all(promises);
        console.log("Todos los usuarios se registraron correctamente.");
        // Aquí puedes realizar cualquier acción adicional después de registrar a todos los usuarios
      } catch (error) {
        console.error("Error al registrar usuarios:", error);
      }
    }; */

    return (
        <div>
        <form onSubmit={handleSubmit}>
     
          <label>
            Cantidad de usuarios:
            <input
              type="number"
              value={usersQuantity}
              onChange={(e) => setUsersQuantity(e.target.value)}
            />
          </label>
  
       
          {additionalInputs}
  
        
          <button type="submit">Registrar Usuarios</button>
        </form>
      </div>
  )
}

export default MassiveUploadUsers