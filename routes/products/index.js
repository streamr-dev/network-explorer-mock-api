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

const isEmpty = (value) => !value ||/^\s*$/.test(value)

const middlewares = {
    init: (req, res, next) => {
        res.locals.result = products
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

module.exports = router
