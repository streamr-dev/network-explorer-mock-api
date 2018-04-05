const router = require('express').Router()
const { integrationKeys, loginError } = require('../../lib/data')

router.get('/', (req, res) => {
    req.app.locals.loggedIn ? res.json(integrationKeys) : res.status(401).json(loginError)
})

module.exports = router
