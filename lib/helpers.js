
exports.renderText = (value) => (req, res) => {
    res.send(value)
}

exports.renderJson = (value) => (req, res) => {
    res.json(value)
}
