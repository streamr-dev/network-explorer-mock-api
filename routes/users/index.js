const router = require('express').Router()
const { userKeys, loginError } = require('../../lib/data')

router.get('/login', (req, res) => {
    req.app.locals.loggedIn = true

    res.send('Logged in!')
})

router.get('/logout', (req, res) => {
    req.app.locals.loggedIn = false

    res.send('Logged out!')
})

router.get('/me/keys', (req, res) => {
    req.app.locals.loggedIn ? res.json(userKeys) : res.status(401).json(loginError)
})

module.exports = router
