#!/usr/bin/env node
//리눅스, 맥에서는 위의 파일을 돌려라

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.clear()
const answerCallback = (answer) =>{
    if(answer==='y'){
        console.log('감사합니다')
        rl.close()
    }else if(answer==='n'){
        console.log('죄송합니다')
        rl.close()
    }else{
        console.log('y , n 만 입력하세요')
        rl.question('예제 재미있습니까? (y/n)',answerCallback)
    }
    
}
rl.question('예제 재미있습니까? (y/n)',answerCallback)