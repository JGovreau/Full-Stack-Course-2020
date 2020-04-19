import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const parts = course.parts
  const sum = parts.reduce(
      (total, part) => {return total + part.exercises},
      0
    )

    return(
    <b>Number of exercises {sum}</b>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course