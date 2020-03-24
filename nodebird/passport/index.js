const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const {User} = require('../models')
let users = {}

module.exports = (passport) =>{
    passport.serializeUser((user,done)=>{
        console.log('serial',user.id)
        done(null,user.id)
    })

    //메모리에 1번 저장된 것 
    passport.deserializeUser((id,done)=>{
        // console.log(users)
        // if(users[id]){
        //     // console.log('userchk',users[id])
        //     done(null,users[id])
        // }else{
             //db에서 찾아서 복구
            User.findOne({where:{id}})
            .then(user=>done(null,user))
            // .then((user)=>{
            //     users[id]=user
            //     done(null,user)
            // })
            .catch(err=>done(err))
        // }
    })

    local(passport)
    kakao(passport)
}