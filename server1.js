const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const url = require('url')

const parseCookie = (cookie = '') => {
    cookie
        .split(',')
        .map(v => v.split('='))
        .map(([k,...vs])=>[k,vs.join('=')])
        .reduce((acc,[k,v])=>{
            acc[k.trim()] = decodeURIComponent(v)
            return acc
        },{})
}

const session = {

}

const server = http.createServer((req,res)=>{
    const cookies = parseCookie(req.headers.cookie)
    console.log(cookies)
    // console.log('서버 실행')
    // fs.readFile('./server2.html',(err,data)=>{
    //     if(err)
    //         throw err;
    //     res.end(data)
    // })
    if(req.url.startsWith('/login')){
        const{query} = url.parse(req.url)
        const{name} = qs.parse(query)
        const expires = new Date()
        expires.setMinutes(expires.getMinutes()+5)
        res.writeHead(302,{
            Location:'/',
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path-/`
        })
        res.end()
    }else if(cookies.name){
        res.writeHead(200,{'Content-Type':'text/html;charset-utf=8'})
        res.end(`${cookies.name}님 안녕하세요`)
    }else{
        fs.readFile('./server4.html',(err,data)=>{
            if(err)
                throw err;
            res.end(data)
        })
    }
    // console.log(req.headers.cookie)
    // res.writeHead(200,{'Set-Cookie':'mycookie=test'})
    // res.end('Hello Cookie')
}).listen(8080)

server.on('listening',()=>{
    console.log('8080 포트에서 서버 대기중')
})

server.on('error',(error)=>{
    console.error(error)
})


