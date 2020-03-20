'use strict'

const path = require('path')
const Sequelize =require('sequelize')

const env = process.env.NODE_ENV || 'development' //production
const config = require('../config/config.json')[env]

const sequelize = new Sequelize(config.database,config.username,config.password,config)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./user')(sequelize,Sequelize)
db.Comment = require('./comment')(sequelize,Sequelize)

db.User.hasMany(db.Comment,{foreignKey:'commentor',sourceKey:'id'})
db.Comment.belongsTo(db.User,{foreignKey:'commentor',targetKey:'id'})

// hasOne 1대1
// belongs to

module.exports = db