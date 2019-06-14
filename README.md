# 简介

使用 react-hooks 简单实现类似 redux 的功能。其中包括对异步 action 的处理，使用方式类似 redux-thunk

使用 `useMemo`，防止不必要的子组件渲染

重新封装 `dispatch` 实现类似 redux-thunk 的功能

# 使用说明

- Context : 全局共享的 Context

  ```js
  import { useContext } from 'react'
  import { Context } from './react-hooks-redux'
  const { state, dispatch } = useContext(Context)
  ```

- Provider : 包裹需要共享 state 的所有组件，接收一个 reducer

  ```js
  import React from 'react'
  import { Provider } from './react-hooks-redux'
  import * as reducers from './store'

  function App() {
    return <Provider reducers={reducers}>children</Provider>
  }

  // 目前 reducers 支持以下两种写法
  // 第一种 useReducer 默认写法
  function reducer(state = { A: 1, B: 2 }, action) {
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

- useConnct : 将 state 和 action 映射到 props

  ```js
  import React from 'react'
  import { useConnct } from './react-hooks-redux'
  import { dispatchA, dispatchA1, dispatchAGetData } from './actions'

  function A(props) {
    const { count, A, A1, dispatchA, dispatchA1, dispatchAGetData } = props
    return <div>123</div>
  }

  export default useConnct(
    state => {
      return {
        A: state.A,
        A1: state.A1.toJS()
      }
    },
    dispatch => ({
      dispatchA: data => dispatch(dispatchA(data)),
      dispatchA1: data => dispatch(dispatchA1(data)),
      dispatchAGetData: data => dispatch(dispatchAGetData(data))
    })
  )(A)
  ```
