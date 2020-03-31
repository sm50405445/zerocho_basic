const express = require('express')
const router = express.Router()
const{isLoggedIn,isNotLoggedIn} = require('./middlewares')
const {User} = require('../models')
const bcrypt = require('bcrypt')

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    const {email,nick,password,money} = req.body
    try{
        const exUser = await User.findOne({where:{email}})
        if(exUser){
            req.flash('joinError','이미 가입된 이메일')
            return res.redirect('/')
        }
        const hash = await bcrypt.hash(password,12)
        await User.create({
            email,
            nick,
            password:hash,
            money
        })
        return res.redirect('/')
    }
    catch(err){
        console.error(err)
        return next(err)
    }
})

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError)
            return next(authError)
        }
        if(!user){
            req.flash('loginError',info.message)
            return res.redirect('/')
        }

        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect('/')
        })
    })(req,res,next)
})

router.get('/logout',(req,res,next)=>{
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

module.exports = router