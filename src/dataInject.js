/**
 * 埋点数据注入
 */

//埋点数据
let BD = null

//注入埋点数据
const inject = (data = {}) => {
    if (BD) {
        BD = { ...BD, ...data }
    } else {
        BD = data
    }
}

module.exports = {
    get BD() {
        return BD
    },
    inject
}