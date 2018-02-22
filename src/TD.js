import React from 'react'
import { BD } from './dataInject'
import { log } from './functionInject'

//获取type(埋点触发类型)
const getType = (tag) => {
    if (!tag) return
    return tag.type || 'CLICK'
}

//props参数过滤
const propsFilter = (props) => {
    const _props = {}
    Object.keys(props).forEach(key => {
        if (key === 'onTag') continue
        if (this.type === 'CLICK' && key === 'onClick') {
            _props[key] = () => {
                log(BD, props.onTag)
                onClick()
            }
        } else {
            _props[key] = props[key]
        }
    })
    return _props
}

class TD extends React.Component {
    constructor(props) {
        this.state = {
            onTag: props.onTag,
            type: getType(props.onTag)
        }
    }
    render() {
        const _props = propsFilter(this.props)
        return <div {..._props}>
            {props.children}
        </div>
    }
}

export default TD