const router = require('express').Router()
const { products, streams } = require('../../lib/data')

const sorters = {
    name: (p0, p1) => {
        const name0 = p0.name.toLowerCase()
        const name1 = p1.name.toLowerCase()
        return name0 < name1 ? -1 : (name0 === name1 ? 0 : 1)
    },
    dateCreated: (p0, p1) => p0.dateCreated - p1.dateCreated,
    price: (p0, p1) => p0.pricePerSecond - p1.pricePerSecond,
}

const middlewares = {
    init: (req, res, next) => {
        res.locals.result = [].concat(products)
        next()
    },
    filterBySearch: (req, res, next) => {
        const search = req.query.search || ''
        const products = res.locals.result
        if (!/^\s*$/.test(search)) {
            res.locals.result = products.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        }
        next()
    },
    filterByCategory: (req, res, next) => {
        const categoryId = parseInt(req.query.category, 10)
        const products = res.locals.result
        if (!isNaN(categoryId)) {
            res.locals.result = products.filter(p => p.category && p.category.id === categoryId)
        }
        next()
    },
    sort: (req, res, next) => {
        const sortBy = req.query.sortBy
        const products = res.locals.result
        if (sorters.hasOwnProperty(sortBy)) {
            res.locals.result = products.sort(sorters[sortBy])
        }
        next()
    },
    findById: (req, res, next) => {
        const productId = parseInt(req.params.id, 10)
        res.locals.result = res.locals.result.find(p => p.id === productId)
        next()
    },
    toStreams: (req, res, next) => {
        res.locals.result = res.locals.result.streams.map(streamId => streams[streamId])
        next()
    },
    render: (req, res) => {
        res.json(res.locals.result)
    }
}

router.get('/', 
    middlewares.init,
    middlewares.filterBySearch,
    middlewares.filterByCategory,
    middlewares.sort,
    middlewares.render
)

router.get('/:id',
    middlewares.init,
    middlewares.findById,
    middlewares.render
)

router.get('/:id/streams',
    middlewares.init,
    middlewares.findById,
    middlewares.toStreams,
    middlewares.render
)

router.post('/', function(req, res) {

console.log(req.body)
    const product = Object.assign({}, req.body, {
        id: products.length,
    })

    products.push(product)

    res.send(product);
});

module.exports = router
