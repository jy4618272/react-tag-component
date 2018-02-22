module.exports = {
    get injectData() {
        return require('./dataInject').inject
    },
    get injectFunction() {
        return require('./functionInject').inject
    },
    get TD() {
        return require('./TD')
    }
}