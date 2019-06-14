import React, { createContext, useReducer } from 'react'

const toString = Object.prototype.toString

const Context = createContext()

function createStore(reducers) {
  if (toString.call(reducers) !== '[object Object]' && typeof reducers === 'function') {
    return reducers
  }
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

function Provider(props) {
  const { reducers, children, initState, init } = props
  const getState = createStore(reducers)
  const [state, dispatch] = useReducer(getState, initState || getState(), init)
  return (
    <Context.Provider
      value={{
        state,
        dispatch: asyncDispatch(dispatch, state)
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }
