const crypto = require('crypto')
const util = require('util')

const randomBytesPromise = util.promisify(crypto.randomBytes)
const pbkdf2Promise = util.promisify(crypto.pbkdf2)

crypto.randomBytes(64,(err,buf)=>{
    const salt = buf.toString('base64')
    console.log('salt',salt)
    crypto.pbkdf2('이상민123123',salt,651395,64,'sha512',(err,key)=>{
        console.log('password',key.toString('base64'))
    })
})

randomBytesPromise(64)
.then((buf)=>{
    const salt = buf.toString('base64')
    return pbkdf2Promise('이상민123123',salt,651395,64,'sha512')
})
.then((key)=>{
    console.log('password',key.toString('base64'))
})

(async()=>{
    const buf = await randomBytesPromise(64)
    const salt = buf.toString('base64')
    const key = await pbkdf2Promise('이상민123123',salt,651395,64,'sha512')
})


crypto.createHash('sha512').update('비밀번호').digest('base64')