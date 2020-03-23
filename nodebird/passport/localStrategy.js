const localStorage = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {User} = require('../models')

module.exports = (passport) => {
    passport.use(new localStorage({
        usernameField:'email', //req.body.email
        passwordField:'password', //req.body.password
    },async (email,passowrd,done)=>{//done(에러,성공,실패)
        try{
            const exUser = await User.find({where:{email}})
            if(exUser){
                //비밀번호 검사
                const result = await bcrypt.compare(passowrd,exUser.password)
                if(result){
                    done(null,exUser)
                }else{
                    done(null,false,{message:'이메일 - 비밀번호가 일치하지 않습니다'})
                }
            }else{
                done(null,false,{message:'이메일 - 비밀번호가 일치하지 않습니다'})
            }
        }   
        catch(err){
            console.error(err)
            done(err)
        }
    }))
}