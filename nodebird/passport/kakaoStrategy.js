const KakaoStrategy = require('passport-kakao').Strategy

const {User} = require('../models')

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL:'/auth/kakao/callback',
    },async(accessToken,refreshToken,profile,done)=>{

    }))
}