const router = require('express').Router()
const { streams } = require('../../lib/data')

router.get('/', (req, res) => {
    res.json(streams)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    res.json(streams.find(s => s.id === id))
})

module.exports = router
