import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Votes = ({ num }) => {
  return (
    <div>
      <p>
        has {num} votes
      </p>
    </div>
  )
}

const Leaderboard = ({ anecdote, num }) => {
  return (
    <div>
      <h1>
        Anecdote with most votes
      </h1>
      <p>
        {anecdote}
      </p>
      <Votes num={num}/>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votesArray, incrementVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [leaderIndex, updateLeaderIndex] = useState(0)

  const handleNext = () => {
    // Select a random next anecdote
    const rand = Math.floor((Math.random() * 6))
    setSelected(rand)
  }

  const handleVote = () => {
    // Copy the votes array and increment the
    // selected anecdote's vote count
    const copy = [...votesArray]
    copy[selected] += 1

    incrementVotes(copy)

    // If newly incremented vote count is higher 
    // than the old leader, update the leaderboard
    if (copy[selected] > copy[leaderIndex]) {
      updateLeaderIndex(selected)
    }
  }

  return (
    <div>
      <p>
        {props.anecdotes[selected]}
      </p>
      <Votes num={votesArray[selected]}/>
      <div>
        <Button onClick={handleVote} text="vote" />
        <Button onClick={handleNext} text="next anecdote" />
      </div>
      <Leaderboard anecdote={anecdotes[leaderIndex]} num={votesArray[leaderIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)