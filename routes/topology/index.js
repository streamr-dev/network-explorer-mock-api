const router = require('express').Router()
const { topologies } = require('../../lib/data')

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.json({
        [id]: topologies[id],
    })
})

module.exports = router
