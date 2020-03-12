const fs = require('fs')
fs.writeFile('./writeMe.txt','글을 써주세요',(err,data)=>{
    if(err){
        throw err
    }
    fs.readFile('./writeMe.txt',(err,data)=>{
        if(err)
            throw err

        console.log(data.toString())
    })
})