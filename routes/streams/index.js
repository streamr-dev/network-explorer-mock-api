const router = require('express').Router()
const { streams } = require('../../lib/data')

router.get('/', (req, res) => {
    const search = (req.query.search || '').toLowerCase()

    const publicStreams = streams.filter(({ public }) => public)

    if (!search) {
        res.json(publicStreams)
    } else {
        res.json(
            publicStreams
                .filter(({ id, description }) => (
                    (id && id.toLowerCase().indexOf(search) >= 0) || (description && description.toLowerCase().indexOf(search) >= 0)
                ))
        )
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const stream = streams.find(s => s.id === id)

    if (!stream || !stream.public) {
        const error = new Error('Not found')
        error.status = 404
        throw error
    }

    res.json(stream)
})

router.get('/:id/validation', (req, res) => {
    const id = req.params.id
    const stream = streams.find(s => s.id === id)

    if (!stream) {
        const error = new Error('Not found')
        error.status = 404
        throw error
    }

    res.json(stream)
})

module.exports = router
