const express = require('express')
const router = express.Router()

const StuModels = require('../lib/mongo').Stu

// 添加学生
router.post('/addStu', (req, res) => {
    const adminId = req.body.adminId
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email

    const newStu = new StuModels({
        adminId: adminId,
        name: name,
        phone: phone,
        email: email
    })
    newStu.save().then((stu) => {
        console.log(stu)
        return res.status(200).json({
            status: true,
            msg: '添加成功'
        })
    })
})

// 通过adminID 查学生
router.get('/selAllStu/:adminId', (req, res) => {
    const adminId = req.params.adminId
    StuModels.find({adminId: adminId})
        .populate({path: 'adminId', model: 'user'})
        .then((stuList) => {
            console.log(stuList)
            return res.status(200).json({
                status: true,
                stuList: stuList
            })
        })
})

// 通过学生 _id 查学生信息
router.get('/getStuInfo/:_id', (req, res) => {
    const _id = req.params._id
    StuModels.findOne({_id: _id})
        .then((stu) => {
            console.log(stu)
            return res.status(200).json({
                stuInfo: stu
            })
        })
})

// 通过学生_id 修改学生信息
router.post('/edtiStuInfo', (req, res) => {
    const _id = req.body._id
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    StuModels.updateOne({_id: _id}, {$set: {
        name: name,
        phone: phone,
        email: email
    }}).then((stu) => {
        console.log(stu)
        return res.status(200).json({
            status: true,
            msg: '修改成功',
            stu: stu
        })
    })
})

// 通过学生_id 删除学生信息
router.get('/delStuInfo/:_id', (req, res) => {
    const _id = req.params._id
    StuModels.remove({ _id: _id })
        .then((stu) => {
            console.log(stu)
            return res.status(200).json({
                status: true,
                msg: '删除成功'
            })
        })
})

module.exports = router