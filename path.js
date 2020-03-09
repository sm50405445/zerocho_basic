const path = require('path')
console.log(path.dirname(__filename))
console.log(path.extname(__filename))
console.log(path.basename(__filename))
//경로 제대로 알려줌
console.log(path.normalize('C://Users\\\\zerocho\\ \path.js'))
//상대경로 알려줌
console.log(path.relative('C:\\users\\zerocho\\path.js','path.js'))
//상대경로 경로 합침
console.log(path.join(__dirname,'..','..','/users','.','zerocho'))
//절대경로
console.log(path.resolve(__dirname,'..','..','/users','.','zerocho'))