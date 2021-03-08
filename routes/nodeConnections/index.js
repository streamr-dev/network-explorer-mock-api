const router = require('express').Router()
const { nodeConnections } = require('../../lib/data')

router.get('/', (req, res) => {
    res.json(nodeConnections)
})

module.exports = router
