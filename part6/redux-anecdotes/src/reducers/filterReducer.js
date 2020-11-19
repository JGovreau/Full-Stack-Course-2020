
const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data

    case 'CLEAR_FILTER':
      return null

    default:
      return state
  }
}

export const setFilter = (value) => {
  return {
    type: 'SET_FILTER',
    data: value
  }
}

export const clearFilter = () => {
  return {
    type: 'CLEAR_FILTER'
  }
}

export default filterReducer