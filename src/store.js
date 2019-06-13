import Immutable from 'immutable'

export const A = (state = 1, action) => {
  if (action.type === 'AAA') {
    return action.data
  }
  return state
}

export const A1 = (state = Immutable.fromJS({ name: 'A1' }), action) => {
  if (action.type === 'AAA1') {
    return Immutable.fromJS(action.data)
  }
  return state
}

export const B = (state = 2, action) => {
  if (action.type === 'BBB') {
    return action.data
  }
  return state
}
