export function dispatchA(data) {
  return {
    type: 'AAA',
    data
  }
}

export function dispatchA1(data) {
  return {
    type: 'AAA1',
    data
  }
}

export function dispatchAGetData() {
  return (disaptch, state) => {
    setTimeout(() => {
      disaptch({
        type: 'AAA',
        data: state.A + 10
      })
    }, 2000)
  }
}
