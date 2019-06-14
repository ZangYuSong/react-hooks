# 简介

使用 react-hooks 简单实现类似 redux 的功能。其中包括对异步 action 的处理，使用方式类似 redux-thunk

# 参数说明

- Context : 全局共享的 Context

  ```js
  import { useContext } from 'react'
  import { Context } from './react-hooks-redux'
  const { state, dispatch } = useContext(Context)
  ```

- Provider : 包裹需要共享 state 的所有组件，接收一个 reducer、initState（可选，默认值）、init（可选，默认值的处理函数）

  ```js
  import React from 'react'
  import { Provider } from './react-hooks-redux'
  import * as reducers from './store'

  function App() {
    return <Provider reducers={reducers}>children</Provider>
  }

  // 目前 reducers 支持以下两种写法
  // 第一种 useReducer 默认写法
  // 第一种写法需要出入默认值  initState 或者 init
  function reducer(state, action) {
    switch (action.type) {
      case 'AAA':
        return { ...state, A: action.data }
      case 'BBB':
        return { ...state, B: action.data }
      default:
        return state
    }
  }

  // 第二种写法
  // 直接指定默认值，无需指定 initState 或则 init
  export const A = (state = 1, action) => {
    if (action.type === 'AAA') {
      return action.data
    }
    return state
  }

  export const B = (state = 2, action) => {
    if (action.type === 'BBB') {
      return action.data
    }
    return state
  }
  ```

- createState : 将 state 重新映射，接收一个函数，这个函数接收参数 state，这个函数返回一个新的 state 对象。整个方法返回一个 mapStateToProps 函数
- createDispatch : 将 dispath 重新映射，接收一个函数，这个函数接收参数 dispath，这个函数返回一个新的 dispath 函数对象。整个方法返回一个 mapDispatchToProps 函数
- useConnct : 将 mapStateToProps 和 mapDispatchToProps 映射到 props

  ```js
  import React from 'react'
  import { createState, createDispatch, useConnct } from './react-hooks-redux'
  import { dispatchA, dispatchA1 } from './actions'

  const mapStateToProps = createState(state => {
    return {
      A: state.A,
      A1: state.A1.toJS()
    }
  })

  const mapDispatchToProps = createDispatch(dispatch => ({ 
    dispatchA: data => dispatch(dispatchA(data)),
    dispatchA1: data => dispatch(dispatchA1(data))
  }))

  function A(props) {
    const { A, A1, dispatchA, dispatchA1 } = props

    return <div>123</div>
  }

  export default useConnct(mapStateToProps, mapDispatchToProps)(A)
  ```
