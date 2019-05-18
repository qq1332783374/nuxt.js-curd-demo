const express = require('express')
const router = express.Router()
// 加密
const sha1 = require('sha1')
const UserModels = require('../lib/mongo').User

router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = sha1(req.body.password1)

    UserModels.findOne({username: username})
        .then((user) => {
            if (user) {
                return res.status(200).json({
                    status: false,
                    msg: '用户已经被注册'
                })
            } else {
                const newUser = new UserModels({
                    username: username,
                    password: password
                })
                newUser.save().then((user) => {
                    console.log(user)
                    res.status(200).json({
                        status: true,
                        msg: '注册成功'
                    })
                })
            }
        })
})

module.exports = router