import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)


  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const noteObject = {
      id: notes.length+1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      content: newNote
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }


  const handleNewNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all" }
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNewNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
