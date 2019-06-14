import React, { useContext } from 'react'
import { Context } from './react-hooks-redux'

function B() {
  console.log(Context)
  const { state, dispatch } = useContext(Context)
  const { B } = state
  return (
    <div>
      <div>{B}</div>
      <div>
        <button
          onClick={() => {
            dispatch({
              type: 'BBB',
              data: B + 1
            })
          }}
        >
          B ++
        </button>
      </div>
      {new Date().toLocaleString()}
    </div>
  )
}

export default B
