import React from 'react'
import { useConnct } from './react-hooks-redux'
import { dispatchA, dispatchA1, dispatchAGetData } from './actions'

function A(props) {
  const { count, A, A1, dispatchA, dispatchA1, dispatchAGetData } = props

  function changeA() {
    dispatchA(A + 1)
  }

  function changeA1() {
    dispatchA1({ name: A1.name + 1 })
  }

  return (
    <div>
      <div>count : {count}</div>
      <div>{A}</div>
      <div>
        <button onClick={changeA}>A ++</button>
        <button onClick={dispatchAGetData}>异步 2秒后改变A A+10</button>
      </div>
      <div>{A1.name}</div>
      <div>
        <button onClick={changeA1}>改变名字</button>
      </div>
      {new Date().toLocaleString()}
    </div>
  )
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
