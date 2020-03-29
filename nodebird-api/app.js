const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

require('dotenv').config();

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const v1 = require('./routes/v1')

const { sequelize } = require('./models')
const passportConfig = require('./passport')

const app = express();
sequelize.sync()
passportConfig(passport)

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
app.set('port',process.env.PORT||'8001')

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    }
}))
app.use(flash())
//설정초기화
app.use(passport.initialize())
//사용자 정보 세션
//express 세션보다 밑에 있어야함
app.use(passport.session())

app.use('/',indexRouter)
app.use('/auth',authRouter)
app.use('/v1',v1)

app.use((req,res,next)=>{
    const err = new Error('Not Found Page')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT} 포트에서 서버 실행`)
})