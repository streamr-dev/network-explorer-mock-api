const router = require('express').Router()
const { products } = require('../../lib/data')
const { renderJson, authorize } = require('../../lib/helpers')

router.get('/',
    authorize,
    renderJson(products.slice(0,4).map(product => ({
        address: "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
        endsAt: new Date().toUTCString(),
        product: { ...product }
    }))),
)

module.exports = router
