import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()

    event.target.value === ''
      ? props.clearFilter() //dispatch(clearFilter())
      : props.setFilter(event.target.value) //dispatch(setFilter(event.target.value))

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

const mapDispatchToProps = dispatch => {
  return {
    setFilter: value => dispatch(setFilter(value)),
    clearFilter
  }
}

// export default Filter
export default connect(
  null,
  mapDispatchToProps
)(Filter)