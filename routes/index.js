const express = require('express')
const app = express()

app.locals.loggedIn = false

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})
app.use('/products', require('./products'))
app.use('/categories', require('./categories'))
app.use('/streams', require('./streams'))
app.use('/users', require('./users'))
app.use('/integration_keys', require('./integration_keys'))

module.exports = app
