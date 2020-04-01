const SSE = require('sse')

module.exports = (server) => {
    const sse = new SSE(server)
    //서버시간으로 설정
    sse.on('connection',(client)=>{ //EventSource ServerSentEvents
        setInterval(()=>{
            client.send(new Date().valueOf().toString())
        },1000)
    })
}