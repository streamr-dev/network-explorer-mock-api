var express = require('express')
var router = express.Router()
var faker = require('faker')

faker.seed(1337)

const categories = Array(3).fill(true).map((v, i) => ({
    id: i,
    name: faker.commerce.department(),
}))

const products = Array(16).fill(true).map((v, i) => ({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(3),
    category: categories[i % categories.length],
    state: 'new',
    dateCreated: new Date(),
    lastUpdated: new Date(),
    ownerAddress: faker.random.uuid().replace(/\-/g, ''),
    beneficiaryAddress: faker.random.uuid().replace(/\-/g, ''),
    pricePerSecond: faker.random.number({ min: 10, max: 300 }),
    priceCurrency: 'DATA',
    minimumSubscriptionInSeconds: 0
}))

/* GET home page. */
router.get('/products', function (req, res) {
    res.json(products)
})
router.get('/products/:id', function (req, res) {
    res.json(products.find(p => p.id === req.params.id))
})
router.get('/categories', function (req, res) {
    res.json(categories)
})
router.get('/categories/:id/products', function (req, res) {
    res.json(products.filter(p => p.category.id === categories.find(c => c.id === req.params.id).id))
})

module.exports = router
