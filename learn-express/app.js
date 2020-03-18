const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
var path = require('path');
const session = require('express-session')
const flash = require('connect-flash')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

const app = express()

//app.use('미들웨어','미들웨어') 연달아 가능
app.use(logger('dev'));
//static next 없음 원하는 파일 없을때만 next
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//쿠키에대한 비밀번호
app.use(cookieParser('secret code'));
app.use(session({
    //달라진 부분 없으면 저장 x
    resave:false,
    saveUninitialized: false,
    secret: 'secret code',
    cookie:{
        httpOnly: true,
        secure: false
    }
}))

//로그인 실패시 일회성 메시지 표시
app.use(flash())

app.use((req,res,next)=>{
    console.log('첫 번째 미들웨어')
    next()
},(req,res,next)=>{
    console.log('두 번째 미들웨어')
    next()
})

app.use('/',indexRouter)
app.use('/users',userRouter)

//404 Not Found
app.use((req,res,next)=>{
    res.status(404).send('NOT FOUND')
})

//500 Error
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send('SERVER ERROR')
    
})

module.exports = app;