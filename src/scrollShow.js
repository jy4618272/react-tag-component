/**
 * 滑动展现时埋点
 */

let pNode = new Map(),
    log = null,
    BD = null

//滚动处理事件 
const scrollFn = (e) => {
    const target = e.target
    const pn = pNode.get(target)
    const { clientTop, clientLeft, clientHeight, clientWidth, libs } = pn
    for (let item of libs.values()) {
        const getBoundingClientRect = item.getBoundingClientRect()
        if (item['data-log-time'] > 0 && (Math.abs(getBoundingClientRect.top - clientTop) < clientHeight ||
            Math.abs(getBoundingClientRect.left - clientLeft) < clientWidth)) {
            item['data-log-time']--
            log(BD, item['data-log'])
            libs.delete(item)
        }
    }
}

//计算根几点属性
const caculateProperty = (n) => {
    const clientHeight = n.clientHeight,
        clientWidth = n.clientWidth,
        clientTop = n.getBoundingClientRect().top,
        clientLeft = n.getBoundingClientRect().left
    return { clientHeight, clientWidth, clientTop, clientLeft, libs: new Set() }
}

//添加滚动事件
const addListener = (n) => n.addEventListener('scroll', scrollFn)

//初始化，注入埋点数据和方法
const init = (log, BD) => {
    log = log
    BD = BD
}

//删除卸载的节点
const deletDom = (id, pid) => {
    const pnode = pid ? document.getElementById(tag.pid) : document.documentElement
    const n = document.getElementById(id)
    const obj = pNode.get(pnode)
    obj.libs.delete(n)
    if (obj.libs.size === 0) pNode.delete(pnode)
}

/**
 * 增加展现时埋点dom
 * @param {Object} tag 埋点参数 
 * @param {String} id 需要展现的id
 */
const addDom = (tag, id) => {
    let n = tag.pid ? document.getElementById(tag.pid) : document.documentElement
    if (n) {
        if (!pNode.has(n)) {
            pNode.set(n, caculateProperty(n))
            addListener(n)
        }
        const pn = pNode.get(n)
        setTimeout(() => {
            try {
                const dom = document.getElementById(id)
                dom['data-log-time'] = 1
                dom['data-log'] = tag
                pn.libs.add(dom)
            } catch (e) {
                console.log(e)
            }
        }, 100)
    } else {
        console.warn('节点不存在')
        return
    }
}

module.exports = {
    addDom,
    init,
    deletDom
}
