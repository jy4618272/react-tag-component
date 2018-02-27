import React from 'react'
import { BD } from './dataInject'
import { log } from './functionInject'
import { init, addDom, deletDom } from './scrollShow'

//获取type(埋点触发类型)
const getType = (tag) => {
    if (!tag) return
    return tag.type || 'click'
}

//注入id,滑动展现埋点需要
let tagId = 1

//根据type类型处理埋点方式
const dealData = ({ type, tag, id }, _props) => {
    switch (type) {
        case 'render':
            log(BD, tag)
            break
        case 'click':
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
        case 'scroll':
            _props.id = id
    }
}

class TD extends React.Component {
    constructor(props) {
        super(props)
        const type = getType(props.Tag)
        if (type === 'scroll') init(log, BD)

        this.state = {
            tag: props.Tag,
            type: type,
            id: type === 'scroll' ? 'tag' + (tagId++) : ''
        }
    }
    componentDidMount() {
        if (this.state.type === 'mount') log(BD, this.state.tag)
        if (this.state.type === 'scroll') {
            addDom(this.state.tag, this.state.id)
        }
    }
    componentWillUnmount() {
        if (this.state.type == 'scroll') deletDom(id, tag.pid)
    }
    render() {
        const _props = { ...this.props }
        Reflect.deleteProperty(_props, 'Tag')
        dealData(this.state, _props)
        return <div {..._props}>
            {this.props.children}
        </div>
    }
}

export default TD