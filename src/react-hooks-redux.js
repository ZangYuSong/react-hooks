import React, { createContext, useReducer, useContext, useMemo } from 'react'

const Context = createContext()

function createStore(reducers) {
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
  const { reducers, children } = props
  const getState = createStore(reducers)
  const [state, dispatch] = useReducer(getState, undefined, getState)
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

function useConnct(mapStateToProps, mapDispatchToProps) {
  return function(Component) {
    let newProps = {}
    let lastStr = ''
    return function(props = {}) {
      /* eslint-disable */
      const { state, dispatch } = useContext(Context)
      const initMapStateToProps = mapStateToProps ? mapStateToProps(state) : {}
      const initMapDispatchToProps = mapDispatchToProps ? mapDispatchToProps(dispatch) : {}
      Object.assign(newProps, props, initMapStateToProps, initMapDispatchToProps)
      const newStr = JSON.stringify(newProps)
      if (lastStr !== newStr) {
        newProps = Object.assign({}, newProps)
        lastStr = newStr
      }
      return useMemo(() => <Component {...newProps} />, [newProps])
    }
  }
}

export { Context, Provider, useConnct }
