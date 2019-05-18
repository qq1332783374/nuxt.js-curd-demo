const express = require('express')
const router = express.Router()
// 加密
const sha1 = require('sha1')
const UserModels = require('../lib/mongo').User

router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = sha1(req.body.password)

    UserModels.findOne({
        username: username
    }).then((user) => {
        if (user) {
            if (password !== user.password) {
                return res.status(200).json({
                    status: false,
                    msg: '密码错误'
                })
            }
            if (username === user.username && password === user.password) {
                return res.status(200).json({
                    status: true,
                    msg: '登录成功',
                    user: {
                        _id: user._id,
                        username: user.username,
                        date: user.date
                    }
                })
            }
        } else {
            return res.status(200).json({
                status: false,
                msg: '用户不存在,请前往注册'
            })
        }

    })
})


module.exports = router