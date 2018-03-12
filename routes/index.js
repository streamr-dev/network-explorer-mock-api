const router = require('express').Router()

router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/streams', require('./streams'))

module.exports = router
