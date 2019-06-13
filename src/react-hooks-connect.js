import React, { createContext, useReducer, useContext, useMemo } from 'react'

export const Context = createContext()

export function createStore(reducers) {
  if (typeof reducers === 'function') return reducers
  const keys = Object.keys(reducers)
  return function(state = {}, action = {}) {
    keys.forEach(key => {
      if (typeof reducers[key] === 'function') {
        state[key] = reducers[key](state[key], action)
      }
    })
    return Object.assign({}, state)
  }
}

function asyncDispatch(dispatch, state) {
  return function(action) {
    if (typeof action === 'function') {
      action(dispatch, state)
    } else {
      dispatch(action)
    }
  }
}

export function Provider(props) {
  const { reducers, children } = props
  const store = createStore(reducers)
  const [state, dispatch] = useReducer(store, store())
  return <Context.Provider value={{ state, dispatch: asyncDispatch(dispatch, state) }}>{children}</Context.Provider>
}

export function useSelector(args, fn) {
  return function getSelector(state) {
    return fn(...args.map(arg => arg(state)))
  }
}

export function useDispatch(fn) {
  return function getDispatch(dispatch) {
    return fn(dispatch)
  }
}

function reducerProps(props, data) {
  const keys = Object.keys(data)
  keys.forEach(key => {
    props[key] = data[key]
  })
}

export function useConnct(mapState, mapDispatch) {
  return function(fn) {
    let newProps = {}
    let oldProps = {}
    return function(props = {}) {
      /* eslint-disable */
      const { state, dispatch } = useContext(Context)
      reducerProps(newProps, props)
      reducerProps(newProps, mapState ? mapState(state) : {})
      reducerProps(newProps, mapDispatch ? mapDispatch(dispatch) : {})
      if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
        newProps = Object.assign({}, newProps)
      }
      oldProps = Object.assign({}, newProps)
      return useMemo(() => fn(newProps), [newProps])
    }
  }
}
