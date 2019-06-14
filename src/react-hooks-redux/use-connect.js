import { useContext, useMemo } from 'react'
import { Context } from './provide'

function reducerProps(props, newProps) {
  const keys = Object.keys(newProps)
  keys.forEach(key => {
    props[key] = newProps[key]
  })
}

function createState(func) {
  if (typeof func !== 'function') {
    throw new Error('The passed argument must be a function')
  }
  return function mapStateToProps(state, props) {
    const newProps = func(state)
    newProps && reducerProps(props, newProps)
  }
}

function createDispatch(func) {
  if (typeof func !== 'function') {
    throw new Error('The passed argument must be a function')
  }
  return function mapDispatchToProps(dispatch, props) {
    const newProps = func(dispatch)
    newProps && reducerProps(props, newProps)
  }
}

function noop() {
  return {}
}

function useConnct(mapStateToProps = noop, mapDispatchToProps = noop) {
  return function(fn) {
    let newProps = {}
    let lastPropsStr = ''
    return function(props = {}) {
      /* eslint-disable */
      const { state, dispatch } = useContext(Context)
      reducerProps(newProps, props)
      mapStateToProps(state, newProps)
      mapDispatchToProps(dispatch, newProps)
      const currentPropsStr = JSON.stringify(newProps)
      if (lastPropsStr !== currentPropsStr) {
        newProps = Object.assign({}, newProps)
        lastPropsStr = currentPropsStr
      }
      return useMemo(() => fn(newProps), [newProps])
    }
  }
}

export { createState, createDispatch, useConnct }
