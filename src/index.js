const TD = require('./TD')
const injectData = require('./dataInject').inject
const injectFunction = require('./functionInject').inject

module.exports = {
    //数据注入
    get injectData() {
        return injectData
    },
    //方法注入
    get injectFunction() {
        return injectFunction
    },
    //初始化
    init(bd) {
        return (fn) => {
            injectData(bd)
            injectFunction(fn)
        }
    },
    //TD埋点组件
    get TD() {
        return require('./TD').default
    }
}