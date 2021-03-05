const router = require('express').Router()
const { nodes } = require('../../lib/data')

router.get('/', (req, res) => {
    res.json(nodes)
})

module.exports = router
