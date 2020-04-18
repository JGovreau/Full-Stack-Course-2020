import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/*const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  const [ left, setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [ allClicks, setAll ] = useState([])

  const handleLeft = () => {
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  }

  const handleRight = () => {
    setAll(allClicks.concat('R'))
    setRight(right+1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeft} text="Left" />
        <Button onClick={handleRight} text="Right" />
        {right}
        <History allClicks={allClicks}/>
      </div>
    </div>
  )
}
*/

const App = (props) => {
  const [value, setValue] = useState(10)

  const setToNewValue = (value) => () =>  {
    setValue(value)
  }

  return (
    <div>
      {value}
      <button onClick={setToNewValue(1000)}>thousand</button>
      <button onClick={setToNewValue(0)}>reset</button>
      <button onClick={setToNewValue(value+1)}>add 1</button>
    </div>
  )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
