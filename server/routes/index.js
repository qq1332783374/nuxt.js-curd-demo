module.exports = (app) => {
    app.use('/singup', require('./singup'))
    app.use('/signin', require('./signin'))
    app.use('/stu', require('./stu'))
}
