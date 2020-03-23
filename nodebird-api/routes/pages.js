const express = require('express')
const router = express.Router()
const {isLoggedIn,isNotLoggedIn} = require('./middleware')

//내정보
router.get('/profile',isLoggedIn,(req,res,next)=>{
    res.render('profile',{
        title:'내 정보 - NodeBird',
        user:null
    })
})

//회원가입
router.get('/join',isNotLoggedIn,(req,res,next)=>{
    res.render('join',{
        title:'회원가입 - NodeBird',
        user:req.user,
        joinError:req.flash('joinError')
    })
})

//메인
router.get('/',(req,res,next)=>{
    res.render('main',{
        title:'Main - NodeBird',
        twits:[],
        user:null,
        loginError:req.flash('loginError')
    })
})

module.exports = router