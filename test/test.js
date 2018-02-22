const assert = require('assert')
const dataInject = require('../src/dataInject')
const functionInject = require('../src/functionInject')

describe('Buried Data', () => {
    it('# dataInject.inject()', () => {
        const d = {
            tag1: 1
        }
        dataInject.inject(d)
        assert.deepEqual(dataInject.BD, 1)
    })
    it('# re dataInject.inject()', () => {
        dataInject.inject({
            tag2: 2
        })
        assert.deepEqual(dataInject.BD, { tag1: 1, tag2: 2 })
    })
})

describe('Log Function', () => {
    it('# functionInject.inject()', () => {
        const log = () => console.log('埋点事件')
        functionInject.inject(log)
        assert.equal(functionInject.log, log)
    })
})