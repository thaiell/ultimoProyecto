export const randomGeneratorOfNumbersAndLetters = (length) => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomChain = "";
 
    for(let i = 0; i < length; i++) {
       let index = Math.floor(Math.random() * characters.length)
       randomChain += characters.charAt(index)
    }
    return randomChain;
 }


export const getTodayDate = (separadorDeFecha) => {
   const fecha = new Date();
   const day = fecha.getDate();
   const month = fecha.getMonth() + 1;
   const year = fecha.getFullYear();
   return (`${day}${separadorDeFecha}${month}${separadorDeFecha}${year}`)
}

export const getDate_Month_Year = (selectDate_Month_Year) => {
   const fecha = new Date()
   if(selectDate_Month_Year === "date"){
      return fecha.getDate()
   } else if(selectDate_Month_Year === "month"){
      return fecha.getMonth() + 1;
   } else if(selectDate_Month_Year === "year"){
      return fecha.getFullYear()
   }
}
