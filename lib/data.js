var faker = require('faker')

faker.seed(1337)

const productStates = {
    NOT_DEPLOYED: 'NOT_DEPLOYED',
    DEPLOYED: 'DEPLOYED',
}

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
        owner: faker.name.firstName() + " " + faker.name.lastName(),
        imageUrl: 'https://www.streamr.com/assets/HeroImages/Streamr-HeroImage.78f384ad8ae41942afb77cae2f199c80.jpg',
        category: categories[i % categories.length],
        streams: streamIds,
        previewStream: streamIds.length > 0 ? streamIds[0] : null,
        state: faker.random.objectElement(productStates),
        dateCreated: new Date(),
        lastUpdated: new Date(),
        ownerAddress: '0x7Ce38183F7851EE6eEB9547B1E537fB362C79C10',
        beneficiaryAddress: '0x7Ce38183F7851EE6eEB9547B1E537fB362C79C10',
        pricePerSecond: faker.random.boolean() ? 0 : faker.finance.amount(0.000001, 2, 10),
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
