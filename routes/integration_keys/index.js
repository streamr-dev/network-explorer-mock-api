const router = require('express').Router()
const { integrationKeys, loginError } = require('../../lib/data')
const { renderJson, authorize } = require('../../lib/helpers')

router.get('/',
    authorize,
    renderJson(integrationKeys),
)

module.exports = router
