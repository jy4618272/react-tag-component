import React from 'react'
import { BD } from './dataInject'
import { log } from './functionInject'
import { init, addDom, deletDom } from './scrollShow'

//获取type(埋点触发类型)
const getType = (tag) => {
    if (!tag) return
    return tag.type || 'CLICK'
}

//根据type类型处理埋点方式
const dealData = ({ type, tag, id }, _props) => {
    switch (type) {
        case 'RENDER':
            log(BD, tag)
            break
        case 'CLICK':
            if (_props.onClick) {
                const fn = _props.onClick
                _props.onClick = () => {
                    log(BD, tag)
                    fn()
                }
            } else {
                _props.onClick = () => log(BD, tag)
            }
            break
        case 'SCROLL':
            _props.id = id
            addDom(tag, id)
    }
}

class TD extends React.Component {
    constructor(props) {
        super(props)
        const type = getType(props.onTag)
        if (type === 'SCROLL') init(log, BD)
        this.state = {
            tag: props.onTag,
            type: type,
            id: 'tag' + new Date().getTime()
        }
    }
    componentDidMount() {
        if (this.type === 'MOUNT') log(BD, this.tag)
    }
    componentWillUnmount() {
        if (this.type == 'SCROLL') deletDom(id, tag.pid)
    }
    render() {
        const _props = this.props
        Reflect.defineProperty(_props, 'onTag')
        dealData(this.state, _props)
        return <div {..._props}>
            {props.children}
        </div>
    }
}

export default TD