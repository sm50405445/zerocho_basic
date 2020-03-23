exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){//req.login,req.logout
        next()
    }else{
        res.status(403).send('로그인 필요합니다')
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next()
    }else{
        res.redirect('/')
    }
}