import React, { useState } from 'react'
import { Provider } from './react-hooks-connect'
import * as reducers from './store'
import A from './A'
import B from './B'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Provider reducers={reducers}>
      <button onClick={() => setCount(count + 1)}>改变 count</button>
      <div style={{ marginTop: 80 }}>只要 store 变化就会重新渲染所有组件，A 改变 B也会渲染</div>
      <div>有没有被渲染仔细看输出的时间</div>
      <A count={count} />
      <div style={{ marginTop: 80 }}>对组件 A 添加处理之后，B 改变 A不会渲染</div>
      <B />
    </Provider>
  )
}

export default App
