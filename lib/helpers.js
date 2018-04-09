const { loginError } = require('./data')

exports.renderText = (value) => (req, res) => {
    res.send(value)
}

exports.renderJson = (value) => (req, res) => {
    res.json(value)
}

exports.setLoggedIn = (value) => (req, res, next) => {
    const app = req.app

    app.set('loggedIn', !!value)
    next()
}

exports.authorize = (req, res, next) => {
    const app = req.app

    if (app.get('loggedIn')) {
        next()
    } else {
        res.status(401).json(loginError)
    }
}
