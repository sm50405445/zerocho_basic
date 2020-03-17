const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length
const http = require('http')

if(cluster.isMaster){
    console.log('마스터 프로세스 아이디',process.pid)
    for(let i = 0 ; i<numCPUs; i+=1){
        cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(worker.process.pid,'워커가 종료되었습니다')
        // cluster.fork()
    })
}else{
    http.createServer((req,res)=>{
        res.end('http server')
        setTimeout(()=>{
            process.exit(1)
        },1000)
    }).listen(8080)
    console.log(process.pid,'워커실행')
}