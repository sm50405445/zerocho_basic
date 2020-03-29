const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const {isLoggedIn,isNotLoggedIn} = require('./middleware')
const {User} = require('../models')

const router = express.Router()

router.post('/join',isNotLoggedIn,async (req,res,next)=>{
    const {email,nick,passowrd} = req.body
    try{
        const exUser = await User.findOne({where:{email}})
        if(exUser){
            req.flash('joinError','이미 가입된 이메일입니다')
            return res.redirect('/join')
        }
        //12 1초속도
        const hash = await bcrypt.hash(passowrd,12)
        await User.create({
            email,
            nick,
            password:hash
        })
        return res.redirect('/')
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/login',(req,res,next)=>{
    //에러,성공,실패
    passport.authenticate('local',(authError,user,info)=>{
        console.log('user',user)
        if(authError){
            console.error(authError)
            return next(authError)
        }
        if(!user){
            req.flash('loginError',info.message)
            return res.redirect('/')
        }
        return req.login(user,(loginError)=>{
            //req.user 사용자 정보 찾을 수 있음
            if(loginError){
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect('/');
        })
    })(req,res,next);
})

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/')
})

module.exports = router