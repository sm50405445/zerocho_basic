const fs = require('fs')
console.log('시작')
// fs.readFile('./readme.txt',(err,data)=>{
//     if(err){
//         throw err;
//     }
//    console.log('1번')
// })
// fs.readFile('./readme.txt',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log('2번')
// })
// fs.readFile('./readme.txt',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log('3번')
// })
let data = fs.readFileSync('./readme.txt')
console.log(data.toString()+'1')
let data2 = fs.readFileSync('./readme.txt')
console.log(data2.toString()+'2')
let data3 = fs.readFileSync('./readme.txt')
console.log(data3.toString()+'3')
console.log('끝')
