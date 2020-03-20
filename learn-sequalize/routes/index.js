var express = require('express');
var router = express.Router();
const {User} = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll()
  .then((users)=>{
    res.render('sequelize',{ittle:'시퀄라이저 연습',users:users})
  })
  .catch((err)=>{
    console.log(err)
    next(err)
  })
});

module.exports = router;
