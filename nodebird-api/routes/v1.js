const express =require('express')
const jwt = require('jsonwebtoken')

const {verifyToken} = require('./middleware')
const {Domain,User,Post,Hashtag} = require('../models')

const router = express.Router()

router.post('/token',async(req,res,next)=>{
    const {clientSecret} = req.body
    try{
        const domain = await Domain.findOne({
            where:{clientSecret},
            include:{
                model:User,
                attribute:['nick','id']
            }
        })
        if(!domain){
            return res.status(401).json({
                code:401,
                message:'등록되지 않은 도메인입니다 도메인을 등록하세요'
            })
        }
        const token = jwt.sign({
            id: domain.user.id,
            nick: domain.user.nick
        },process.env.JWT_SECRET,{
            expiresIn:'1m',
            issuer:'nodebird'
        })
        return res.json({
            code:200,
            message:'토큰이 발급되었습니다',
            token
        })
    }
    catch(err){
        return res.status(500).json({
            code:500,
            'message':'서버에러'
        })
    }
})

router.get('/test',verifyToken,(req,res,next)=>{
    res.json(req.decoded)
})

router.get('/posts/my',verifyToken,(req,res)=>{
    Post.findAll({
        where:{userId:req.decoded.id}
    }).then(
        (posts)=>{
            res.json({
                code:200,
                payload:posts
            })
        }
    ).catch((err)=>{
        console.error(err)
        return res.status(500).json({
            code:500,
            message:'서버에러'
        })
    })
})

router.get('/posts/hashtag/:title',verifyToken,async(req,res)=>{
    try{
        const hashtag = await Hashtag.find({where:{title:req.params.title}})
        if(!hashtag){
            return res.status(404).json({
                code:404,
                message:'검색결과가 없습니다'
            })
        }
        const posts = await hashtag.getPosts()
        return res.json({
            code:200,
            payload:posts
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        })
    }
})

module.exports = router