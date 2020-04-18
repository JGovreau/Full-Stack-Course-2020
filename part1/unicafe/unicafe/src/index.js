import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ statName, statValue }) => {
  return (
      <tr>
        <td>{statName}</td>
        <td>{statValue}</td>
      </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <Statistic statName="good" statValue={good} />
        <Statistic statName="neutral" statValue={neutral} />
        <Statistic statName="bad" statValue={bad} />
        <Statistic statName="all" statValue={good + neutral + bad} />
        <Statistic statName="average" statValue={(good-bad)/(good + neutral + bad)} />
        <Statistic statName="positive" statValue={good/(good + neutral + bad)} />
        </tbody>
      </table>
    </div>
  )

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)