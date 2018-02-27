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
        const dir = item['data-dir']
        if (dir === 'Top' && getBoundingClientRect.top - clientTop < clientHeight) {
            log(BD, item['data-log'])
            libs.delete(item)
        }
        if (dir === 'Left' && getBoundingClientRect.left - clientLeft < clientWidth) {
            log(BD, item['data-log'])
            libs.delete(item)
        }
    }
}

//计算根节点属性
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
const init = (fn, data) => {
    log = fn
    BD = data
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
 * 增加滚动展现时埋点dom
 * @param {Object} tag 埋点参数 
 * @param {String} id 需要展现的id
 */
const addDom = (tag, id) => {
    let n = tag.pid ? document.getElementById(tag.pid) : document.documentElement
    if (n) {
        if (!pNode.has(n)) {
            pNode.set(n, caculateProperty(n))
            console.log(caculateProperty(n))
            addListener(n)
        }
        const pn = pNode.get(n)
        setTimeout(() => {
            try {
                const dom = document.getElementById(id)
                injectSumToDom(dom, pn, tag)
            } catch (e) {
                console.log(e)
            }
        }, 100)
    } else {
        console.warn('节点不存在')
        return
    }
}

/**
 * 
 * @param {HTMLElement} dom 节点自身 
 * @param {Object} pnode 容器节点
 */
const injectSumToDom = (dom, pnode, tag) => {
    const { clientTop, clientLeft, clientHeight, clientWidth } = pnode
    const selfClientTop = dom.getBoundingClientRect().top,
        selfClientLeft = dom.getBoundingClientRect().left
    if (selfClientTop - clientTop > clientHeight) {
        dom['data-log'] = tag
        dom['data-dir'] = 'Top'
        pnode.libs.add(dom)
    } else if (selfClientLeft - clientLeft > clientWidth) {
        dom['data-log'] = tag
        dom['data-dir'] = 'Left'
        pnode.libs.add(dom)
    }
}

module.exports = {
    addDom,
    init,
    deletDom
}
