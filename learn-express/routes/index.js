var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    throw new Error('서버 고장')
  }
  catch(err){
    next(err)
  }
});

module.exports = router;
