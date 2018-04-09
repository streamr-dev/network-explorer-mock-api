var faker = require('faker')

faker.seed(1337)

const categories = Array(3).fill(true).map((v, i) => ({
    id: i,
    name: faker.commerce.department(),
}))

const streams = Array(24).fill(true).map((v, i) => ({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    config: {
        fields: [],
    },
}))

const products = Array(16).fill(true).map((v, i) => {
    const streamIds = Array(faker.random.number({ max: 3 })).fill(true).map(() => faker.random.arrayElement(streams).id);

    return {
        id: i,
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(3),
        category: categories[i % categories.length],
        streams: streamIds,
        previewStream: streamIds.length > 0 ? streamIds[0] : null,
        state: 'new',
        dateCreated: new Date(),
        lastUpdated: new Date(),
        ownerAddress: faker.random.uuid().replace(/\-/g, ''),
        beneficiaryAddress: faker.random.uuid().replace(/\-/g, ''),
        pricePerSecond: faker.random.number({ min: 10, max: 300 }),
        priceCurrency: 'DATA',
        minimumSubscriptionInSeconds: 0
    }
})

const user = {
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    username: faker.internet.email(),
    timezone: 'UTC',
}

const userKeys = [{
    id: "o7tkyYLBSGarPa3TFitPogdwzOKoKWQQK_80jEhPz1hA",
    name: "Default",
    user: "tester1@streamr.com"
}]

const integrationKeys = [{
    id: "sLjNO_9ATdiwBb3cozLHEg_i-fayKYTwCk3vfG_L4O9g",
    user: 7381,
    name: "MetaMask test",
    service: "ETHEREUM",
    json:{
        address: "0x7ce38183f7851ee64ebc547b1e537fb362c79c10",
    }
}]

const loginError = {
    code: "NOT_AUTHENTICATED",
    message: "Not authenticated via token or cookie"
}

module.exports = {
    categories,
    streams,
    products,
    user,
    userKeys,
    integrationKeys,
    loginError,
}
