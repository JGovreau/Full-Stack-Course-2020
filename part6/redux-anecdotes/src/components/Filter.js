import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()

    event.target.value === ''
      ? dispatch(clearFilter())
      : dispatch(setFilter(event.target.value))

  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
