import React from 'react'
import data from 'data/buried'
import { init, TD } from '../../../src'

function log(bd, tag) {
    const key = tag.key
    const str = bd[key] + '-' + tag.params
    console.log(str)
}

init(data)(log)


export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const slideup = []
        const slideleft = []
        for (let index = 0; index < 10; index++) {
            slideup.push(<TD key={index} Tag={{ key: 'slidetop', params: index, type: 'scroll', pid: 'scrollTop' }} >{index}</TD>)
        }
        for (let index = 0; index < 20; index++) {
            slideleft.push(<TD key={index} Tag={{ key: 'slideleft', params: index, type: 'scroll', pid: 'scrollLeft' }} ><div>{index + ' '}</div></TD>)
        }
        return <div>
            <TD Tag={{ key: 'render', params: 'a', type: 'render' }}>
                render时输出
            </TD>
            <TD Tag={{ key: 'mount', params: 'b', type: 'mount' }}>
                mount时输出
            </TD>
            <TD Tag={{ key: 'click', params: 'c', type: 'click' }}>
                点击时输出
            </TD>
            <div id='scrollTop' style={{ height: '80px', overflow: 'auto' }}>
                上滑动展现埋点
                {slideup}
            </div>
            <span>左滑展现埋点</span>
            <div id='scrollLeft' style={{ overflow: 'auto', width: '100px', display: 'flex', flexFlow: 'column no-wrap' }}>
                {slideleft}
            </div>
        </div>
    }
}