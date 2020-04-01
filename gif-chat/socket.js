const Websocket = require('ws')

module.exports = (server) =>{
    const wss = new Websocket.Server({server})

    wss.on('connection',(ws,req)=>{
        //프록시 서버일경우 아이피
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        console.log('클라이언트 접속',ip)
        ws.on('message',(message)=>{
            console.log(message)
        })
        ws.on('error',(error)=>{
            console.error(error)
        })
        ws.on('close',()=>{
            console.log('클라이언트 접속 해지',ip)
            clearInterval(ws.interval)
        })
        const interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){//ws.CONNECTING ws.CLOSING ws.CLOSED
                ws.send('서버에서 클라이언트로 메시지 보냅')
            }
        },3000)
        ws.interval = interval
        // console.log(ws)
    })
}