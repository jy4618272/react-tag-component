const assert = require('assert')
const dataInject = require('../lib/dataInject')
const functionInject = require('../lib/functionInject')

describe('dataInject 模块', () => {
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
})


describe('functionInject 模块', () => {
    describe('Log Function', () => {
        it('# 空对象注入', () => {
            const log = {}
            functionInject.inject(log)
            assert.ok(functionInject.log == null)
        })
        it('# 有效函数注入', () => {
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

    describe('Function And Data', () => {
        it('# 测试数据和方法', () => {
            const t = functionInject.log(dataInject.BD, { name: 'tag1', params: { a: 1 } })
            assert.deepEqual(t, { pageType: 'test', action: 'click', opts: { a: 1 } })
        })
        it('# 测试函数失败', () => {
            const t = functionInject.log(dataInject.BD, {})
            assert.ok(!t)
        })
    })
})
