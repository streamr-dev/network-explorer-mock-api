var faker = require('faker')
var { default: Wallet } = require('ethereumjs-wallet')
const cities = require('cities.json')
const { countries } = require('countries-list')

faker.seed(1337)

const users = Array(24).fill(true).map((v, i) => {
    const ethWallet = Wallet.generate()
    const address = ethWallet.getAddressString()

    return {
        id: address,
    }
})

const streams = Array(24).fill(true).map((v, i) => {
    const domain = faker.random.arrayElement(users).id
    const path = faker.helpers.slugify(faker.commerce.productName()).toLowerCase()

    return {
        id: `${domain}/${path}`,
        description: faker.lorem.sentence(),
        public: faker.random.boolean(),
        partitions: 1,
        requireEncryptedData: false,
        requireSignedData: false,
        storageDays: 365,
        config: {
            fields: [],
        },
    }
})

const nodes = Array(50).fill(true).reduce((result) => {
    const ethWallet = Wallet.generate()
    const address = ethWallet.getAddressString()
    const {
        country: countryCode,
        name: city,
        lat: latitude,
        lng: longitude,
    } = faker.random.arrayElement(cities)
    const country = (countries[countryCode] && countries[countryCode].name) || countryCode

    return {
        ...result,
        [address]: {
            id: address,
            country,
            city,
            latitude: +latitude,
            longitude: +longitude,
        },
    }
}, {})

const topologies = streams.reduce((result, { id }) => {
    const involvedNodes = faker.random.arrayElements(Object.values(nodes), 10)

    const topology = involvedNodes.reduce((result, { id }) => {
        if (!result[id]) {
            result[id] = []
        }

        involvedNodes.forEach(({ id: neighborId }) => {
            if (id === neighborId) { return }

            // decide randomly if these nodes are connected
            const isConnected = faker.random.number({ max: 5 }) === 0

            if (isConnected && !result[id].some((node) => node.neighborId === neighborId)) {
                result[id].push({
                    neighborId,
                    rtt: faker.random.number({ max: 200 })
                })

                // add two-way connection
                const opposite = {
                    neighborId: id,
                    rtt: faker.random.number({ max: 200 })
                }

                if (!result[neighborId]) {
                    result[neighborId] = [opposite]
                } else if (!result[neighborId].some((node) => node.neighborId === id)) {
                    result[neighborId].push(opposite)
                }
            }
        })

        if (result[id].length === 0) {
            delete result[id]
        }

        return result
    }, {})

    return {
        ...result,
        [id]: topology,
    }
}, {})

const maxRtts = Object.values(topologies).reduce((result, topology) => {
    Object.keys(topology).forEach((nodeId) => {
        if (!result[nodeId]) {
            result[nodeId] = {}
        }

        topology[nodeId].forEach(({ neighborId, rtt }) => {
            if (!result[nodeId][neighborId]) {
                result[nodeId][neighborId] = rtt
            } else {
                result[nodeId][neighborId] = Math.max(result[nodeId][neighborId], rtt)
            }
        })
    })

    return result
}, {})

const nodeConnections = Object.keys(maxRtts).reduce((result, nodeId) => {
    return {
        ...result,
        [nodeId]: Object.keys(maxRtts[nodeId]).map((neighborId) => ({
            neighborId,
            rtt: maxRtts[nodeId][neighborId],
        }))
    }
}, {})

module.exports = {
    streams,
    nodes,
    topologies,
    nodeConnections,
}
