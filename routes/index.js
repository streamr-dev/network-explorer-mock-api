const router = require('express').Router()

router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/streams', require('./streams'))
router.use('/users', require('./users'))
router.use('/integration_keys', require('./integration_keys'))

module.exports = router
