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


const program = require('commander')
program
    .version('0.0.1','-v, --viersion')
    .usage('[options]')
    
program
    .command('template <type>')
    //설명서 <> 필수표시 []선택 표시 --옵션 -단축옵션
    .usage('--name <name> --path [path]')
    .description('템플릿을 생성합니다')
    .alias('tmpl')
    .option('-n, --name <name>','파일명을 입력하세요','index')
    .option('-d, --directory [path]','생성 경로를 입력하세요','.')
    .action((type,options)=>{
        makeTemplate(type,options.name,options.directory)
    })

program
    .command('*',{noHelp:true})
    .action(()=>{
        console.log('해당 명령어를 찾을 수 없습니다')
        program.help()
    })

program.parse(process.argv)