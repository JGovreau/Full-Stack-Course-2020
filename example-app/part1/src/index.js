import React from 'react'
import ReactDom from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old!
      </p>
    </div>
  )
}

const App = () => {
  const anotherName = "Paul"
  const anotherAge = 64
  return(
    <div>
      <h1>Greetings</h1>
      <Hello name="Jordan" age={10 + 15} />
      <Hello name={anotherName} age={anotherAge} />
      <Hello name="Jordeau" />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
