// 数据模型集合

const config = require('../config/default')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(config.mongoURL, {useNewUrlParser: true})

// 用户Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', UserSchema)

// 学生Schema
const StuSchema = new Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    creatTime: {
        type: Date,
        default: Date.now
    }
})
const Stu = mongoose.model('stu', StuSchema)


module.exports = {
    User,
    Stu
}