const assert = require('assert')
const dataInject = require('../src/dataInject')
const functionInject = require('../src/functionInject')

//测试埋点数据注入
describe('Buried Data', () => {
    it('# dataInject.inject()', () => {
        const d = {
            tag1: { pageType: 'test', action: 'click' }
        }
        dataInject.inject(d)
        assert.deepEqual(dataInject.BD, d)
    })
    it('# re dataInject.inject()', () => {
        dataInject.inject({
            tag2: { pageType: 'test', action: 'scroll' }
        })
        assert.deepEqual(dataInject.BD, { tag1: { pageType: 'test', action: 'click' }, tag2: { pageType: 'test', action: 'scroll' } })
    })
})

//测试埋点方法注入
describe('Log Function', () => {
    it('# functionInject.inject()', () => {
        const log = (BD, onTag) => {
            const name = onTag.name
            const params = onTag.params
            const obj = BD[name]
            obj.opts = params
            return obj
        }
        functionInject.inject(log)
        assert.ok(typeof (functionInject.log) == 'function')
    })
})

//测试打埋点
describe('Function And Data', () => {
    it('# functionInject.log', () => {
        const t = functionInject.log(dataInject.BD, { name: 'tag1', params: { a: 1 } })
        assert.deepEqual(t, { pageType: 'test', action: 'click', opts: { a: 1 } })
    })
})