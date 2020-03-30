const express = require('express');
const axios = require('axios');
const cors = require('cors')

const router = express.Router();

router.use(cors())
//router.use(cors('http://localhost:8001'))
router.use((req,res,next)=>{
  cors()(req,res,next)
})

router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.jwt) { // 세션에 토큰이 없으면
      const tokenResult = await axios.post('http://localhost:8001/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code === 200) { // 토큰 발급 성공
        req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      } else { // 토큰 발급 실패
        return res.json(tokenResult.data); // 발급 실패 사유 응답
      }
    }
    // 발급받은 토큰 테스트
    const result = await axios.get('http://localhost:8001/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response.status === 419) { // 토큰 만료 시
      return res.json(error.response.data);
    }
    return next(error);
  }
});

const request = async(req,api)=>{
  try{
    if(!req.session.jwt){
      const tokenResult = await axios.post('http://localhost:8001/v1/token',{
        clientSecret: process.env.CLIENT_SECRET
      })
      req.session.jwt = tokenResult.data.token
    }
    return await axios.get(`http://localhost:8001/v1${api}`,{
      headers:{authorization:req.session.jwt}
    })
  }
  catch(err){
    console.error(err)
    if(error.response.status<500)
        return err.response
    throw err
  }
  
}

router.get('/mypost',async(req,res,next)=>{
  try{
    const result = await request(req,'/posts/my')
    res.json(result.data)
  }
  catch(err){
    console.error(err)
    next(err)
  }
})

module.exports = router;