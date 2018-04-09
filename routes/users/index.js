const router = require('express').Router()
const { user, userKeys } = require('../../lib/data')
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

module.exports = router
