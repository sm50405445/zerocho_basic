#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const readline = require('readline')

let rl;
let type = process.argv[2]
let name = process.argv[3]
let directory = process.argv[4] || '.'

const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta chart="utf-8"/>
        <title>Template</title>
    </head>
    <body>
        <h1>Hello</h1>
        <p>CLI</p>
    </body>
    </html>
`
const routerTemplate = `
    const express = require('express')
    router.get('/',(req,res,next)=>{
        try{
            res.send('ok')
        }
        catch(err){
            console.error(err)
            next(err)
        }
    })
    module.exports = router;
`
const mkdirp = (dir) => {
    const dirname = path.relative(".",path.normalize(dir)).split(path.sep).filter(p=>!!p)
    dirname.forEach((d,idx)=>{
        const pathBuilder = dirname.slice(0,idx+1).join(path.sep)
        if(!exist(pathBuilder)){
            fs.mkdirSync(pathBuilder)
        }
    })
}
// html html/css/js/zerocho [css,js,zerocho]

const exist = (dir) => {
    try{
        fs.accessSync(dir,fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK)
        return true
    }
    catch(err){
        return false
    }
}

const makeTemplate = () => {
    mkdirp(directory)
    if(type === 'html'){
        const pathToFIle = path.join(directory,`${name}.html`)
        if(exist(pathToFIle)){
            console.error('이미 해당파일이 존재')
        }else{
            fs.writeFileSync(pathToFIle,htmlTemplate)
            console.log(pathToFIle,'생성완료')
        }
    }else if(type==='express-router'){
        const pathToFIle = path.join(directory,`${name}.js`)
        if(exist(pathToFIle)){
            console.error('이미 해당파일이 존재')
        }else{
            fs.writeFileSync(pathToFIle,routerTemplate)
            console.log(pathToFIle,'생성완료')
        }
    }else{
        console.error('html 또는 express-router 둘 중 하나를 입력하세요')
    }
}

const dirAnswer = (answer) => {
    directory = (answer && answer.trim() || '.')
    rl.close()
    makeTemplate()
}

const nameAnswer = (answer) => {
    if(!answer || !answer.trim()){
        console.clear()
        console.log('name을 반드시 입력하세요')
        return rl.question('파일명을 설정하세요',nameAnswer)
    }
    name = answer;
    return rl.question('저장할 경로를 설정하세요. (설정하지 않으면 현재경로) ',dirAnswer)
}

const typeAnswer = (answer) => {
    if(answer!='html' && answer != 'express-router'){
        console.clear()
        console.log('html 또는 express-router만 지원합니다')
        return rl.question('어떤 템플릿이 필요합니까?',typeAnswer)
    }
    type = answer
    return rl.question('파일명을 설정하세요',nameAnswer)
}

const program = () => {
    if(!type||!name){
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        console.clear()
        rl.question('어떤 템플릿이 필요하십니까?',typeAnswer)
    }else{
        makeTemplate();
    }
}
program();