import { ERANGE } from "constants"

// setInterval(()=>{
//     console.log('시작')
//     try{
//         throw new Error('서버고장')
//     }
//     catch(err){
//         console.log(err)
//     }
// },1000)

setInterval(()=>{
    throw new Error('서버 고장')
},1000)
setInterval(()=>{
    console.log('실행')
},2000)