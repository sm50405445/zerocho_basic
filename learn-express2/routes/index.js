var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //app.set 설정한 것들 가져올 수 있음
  req.app.get('env')
  res.render('index', { title: 'ejs',fruit:['사과','배','오렌지'] });
});

module.exports = router;
