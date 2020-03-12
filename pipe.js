const fs =require('fs')
const zlib = require('zlib')

//파일 압축
const zlibStream = zlib.createGzip()
const readStream = fs.createReadStream('readme4.txt')
const writeStream = fs.createWriteStream('writeme5.txt')

readStream.pipe(zlibStream).pipe(writeStream)

//파이프는 콜백으로 여러번 사용 가능
// const readStream = fs.copyFile('./readme4.txt','./writeme4.txt',(err)=>{
//     console.log(err)
// })