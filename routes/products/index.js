const router = require('express').Router()
const { products, streams } = require('../../lib/data')

const filteredProducts = (filter) => {
    const search = filter.search || ''

    if (!/^\s*$/.test(search)) {
        return products.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    } else {
        return products
    }
}

router.get('/', (req, res) => {
    res.json(filteredProducts({ search: req.query.search }))
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    res.json(products.find(p => p.id === id))
})

router.get('/:id/streams', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const product = products.find(p => p.id === id)

    res.json(product.streams.map(id => streams[id]))
})

module.exports = router
