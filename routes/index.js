var express = require('express')
var router = express.Router()

const categories = [{
    id: '1',
    name: 'One'
}, {
    id: '2',
    name: 'Two'
}, {
    id: '3',
    name: 'Three'
}]

const products = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(n => ({
    id: n.toString(),
    name: `P${n}`,
    description: `P${n} description`,
    category: categories[n % categories.length],
    state: 'new',
    dateCreated: new Date(),
    lastUpdated: new Date(),
    ownerAddress: 'asdjfl',
    beneficiaryAddress: 'sdkjflk',
    pricePerSecond: 10,
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
