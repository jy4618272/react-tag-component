# react-ontag-component
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ZBcoder/react-ontag-component/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-ontag-component.svg)](https://www.npmjs.com/package/react-ontag-component)
[![Build Status](https://travis-ci.org/ZBcoder/react-ontag-component.svg?branch=master)](https://travis-ci.org/ZBcoder/react-ontag-component)
[![Coverage Status](https://coveralls.io/repos/github/ZBcoder/react-ontag-component/badge.svg?branch=master)](https://coveralls.io/github/ZBcoder/react-ontag-component?branch=master)

react埋点组件，持续集成埋点方式

* **描述：** react-tag-component将会持续集成各种埋点方式，简化开发中的埋点需求，为埋点提供统一标准，旨在降低项目中埋点事件对代码的侵入以及埋点数据的混乱。
* **核心：** 1.数据仓库：自定义埋点数据格式。2.埋点事件：定义数据仓库中数据的读取，打埋点事件的注入。3.埋点组件：嵌入Tag事件，用于挂载相应数据。
* **集成：** 项目中加入了travis-ci、mocha、coveralls使得项目集成更加工程化，同时加入demo对UI部分进行测试。

## 安装
> $ npm install --save react-tag-component

## 示例
```js
import React from 'react'
import { init, TD } from 'react-tag-component'

//埋点数据
const data = const data = {
    'mount': 'componentdidmount 生命周期埋点',
    'click': 'click 事件埋点'
}

/**
 *  埋点事件
 * @param {Object} bd 埋点数据，由内部注入
 * @param {Object} tag 组件上Tag对象，由内部注入
 */
function log(bd, tag) {
    const ld = bd[tag.key]  //获取埋点数据仓库对应值
    ...    //相应处理
}

//数据、事件注入
init(data)(log)

//埋点组件
export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <TD onClick={() => console.log('点击')} Tag={{ key: 'click', params: 'c', type: 'click' }}>
                点击时输出
            </TD>
        </div>
    }
}
```
[更多示例](https://github.com/ZBcoder/react-tag-component/blob/master/demo/src/page/Main.jsx)

## 说明

    1.引入接口: 
        名                |           描述           |       使用            
      init                     初始换函数,数据注入。        init(数据)(方法)
      injectData               埋点数据注入(追加)。       injectData(数据)
      injectFunction           埋点方法注入(替换)。      injectFunction(方法)
      TD                       埋点组件。                 <TD Tag={...}>
    2.组件参数
        名                |           描述
      type[必填]                埋点方式。
      pid[type=='scroll']      祖先节点id(用于滑动展现容器节点)。
      ...                      扩充参数可在埋点事件中获取。
    3.type类型
        名                |           描述
      render                   render时执行
      click                    click时执行
      mount                    componentDidMount生命周期执行
      scroll                   上滑/左滑展现时执行

## 联系
如有问题，联系QQ: 784846435


