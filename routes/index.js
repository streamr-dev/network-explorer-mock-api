const router = require('express').Router()

router.use('/streams', require('./streams'))
router.use('/location', require('./location'))
router.use('/topology', require('./topology'))
router.use('/node-connections', require('./nodeConnections'))

module.exports = router
