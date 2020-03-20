#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const type = process.argv[2]
const name = process.argv[3]
const directory = process.argv[4] || '.'
console.log(process.argv)

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
        fs.accessSync(dir,fs.constants.F_OK | fs.constants.R_OK|fs.constants.W_OK)
        return true
    }
    catch(err){
        return false
    }
}

const makeTemplate = () => {
    mkdirp(directory)
    console.log(type)
    if(type === 'html'){
        const pathToFIle = path.join(directory,`${name}.html`)
        console.log(pathToFIle)
        if(exist(pathToFIle)){
            fs.writeFileSync(pathToFIle,htmlTemplate)
            console.log(pathToFIle,'생성완료')
        }
    }else if(type==='express-router'){
        const pathToFIle = path.join(directory,`${name}.js`)
        if(exist(pathToFIle)){
            fs.writeFileSync(pathToFIle,routerTemplate)
            console.log(pathToFIle,'생성완료')
        }
    }else{
        console.error('html 또는 express-router 둘 중 하나를 입력하세요')
    }
}

const program = () => {
    if(!type||!name){
        console.error('사용방법: cli html|express-router 파일명 [생성 경로]')
    }else{
        makeTemplate();
    }
}
program();