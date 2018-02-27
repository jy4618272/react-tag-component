const TD = require('./TD')
const injectData = require('./dataInject').inject
const injectFunction = require('./functionInject').inject

module.exports = {
    get injectData() {
        return injectData
    },
    get injectFunction() {
        return injectFunction
    },
    init(bd) {
        return (fn) => {
            injectData(bd)
            injectFunction(fn)
        }
    },
    get TD() {
        return require('./TD').default
    }
}