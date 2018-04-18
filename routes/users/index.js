const router = require('express').Router()
const { user, userKeys, products } = require('../../lib/data')
const { renderText, setLoggedIn, renderJson, authorize } = require('../../lib/helpers')

router.get('/login',
    setLoggedIn(true),
    renderText('Logged in!'),
)

router.get('/logout',
    setLoggedIn(false),
    renderText('Logged out!'),
)

router.get('/me', 
    authorize,
    renderJson(user),
)

router.get('/me/keys',
    authorize,
    renderJson(userKeys),
)

router.get('/me/products',
    authorize,
    renderJson(products.slice(0,4)),
)

module.exports = router
