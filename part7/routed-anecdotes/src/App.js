import React, { useState } from 'react'
import { useField } from './hooks'

import {
  BrowserRouter as Router,
  useRouteMatch,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"


const Menu = ({ anecdotes, addNew}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>Anecdotes</Link>
      <Link style={padding} to='/create'>Create New</Link>
      <Link style={padding} to='/about'>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <br />
      <h2>{anecdote.content}</h2>
      Votes: {anecdote.votes}
      <br />
      <br />
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const content = useField('content', 'text')
  // const {reset, ...contentInput} = content

  const author = useField('author', 'text')
  // const {reset, ...authorInput} = author

  const info = useField('info', 'text')
  // const {reset, ...infoInput} = info

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }

    props.addNew(newAnecdote)

    history.push('/')
  }

  const handleReset = (e) => {
    e.preventDefault()

    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
        <form>
          <div>
            content
            <input {...content} reset=""/>
          </div>
          <div>
            author
            <input {...author} reset="" />
          </div>
          <div>
            url for more info
            <input {...info} reset="" />
          </div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={handleReset}>reset</button>
        </form>      
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = async (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`New anecdote created: ${anecdote.content}`)
    
    setTimeout(() => 
      setNotification(''),
      10000
    )
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} />
      <p>{notification}</p>

      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      
      <Footer />
    </div>
  )
}

export default App;
