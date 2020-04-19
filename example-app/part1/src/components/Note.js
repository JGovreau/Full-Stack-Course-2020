import React from 'react'

const Note = ({ notes }) => {
    return (
        <li>{notes.content}</li>
    )
}

export default Note