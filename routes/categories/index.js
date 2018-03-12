const router = require('express').Router()
const { categories } = require('../../lib/data')

router.get('/', (req, res) => {
    res.json(categories)
})

module.exports = router
