var express = require('express')
var router = express.Router()
var faker = require('faker')

faker.seed(1337)

const categories = Array(3).fill(true).map((v, i) => ({
    id: i,
    name: faker.commerce.department(),
}))

const streams = Array(24).fill(true).map((v, i) => ({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    config: {
        fields: [],
    },
}))

const products = Array(16).fill(true).map((v, i) => {
    const streamIds = Array(faker.random.number({ max: 3 })).fill(true).map(() => faker.random.arrayElement(streams).id);

    return {
        id: i,
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(3),
        category: categories[i % categories.length],
        streams: streamIds,
        previewStream: streamIds.length > 0 ? streamIds[0] : null,
        state: 'new',
        dateCreated: new Date(),
        lastUpdated: new Date(),
        ownerAddress: faker.random.uuid().replace(/\-/g, ''),
        beneficiaryAddress: faker.random.uuid().replace(/\-/g, ''),
        pricePerSecond: faker.random.number({ min: 10, max: 300 }),
        priceCurrency: 'DATA',
        minimumSubscriptionInSeconds: 0
    }
})

/* GET home page. */
router.get('/products', function (req, res) {
    res.json(products)
})
router.get('/products/:id', function (req, res) {
    const id = parseInt(req.params.id, 10)
    res.json(products.find(p => p.id === id))
})
router.get('/products/:id/streams', function (req, res) {
    const id = parseInt(req.params.id, 10)
    const product = products.find(p => p.id === id)

    res.json(product.streams.map((id) => streams[id]))
})
router.get('/categories', function (req, res) {
    res.json(categories)
})
router.get('/streams', function (req, res) {
    res.json(streams)
})
router.get('/streams/:id', function (req, res) {
    const id = parseInt(req.params.id, 10)
    res.json(streams.find(s => s.id === id))
})

module.exports = router
