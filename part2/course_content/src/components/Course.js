import React from 'react'

const Header = (props) => {
    return (
        <div>
          <h2>{props.course.name}</h2>
        </div>
      )
}

const Content = (props) => {
    return (
        <div>
            <p> {props.parts[0].name} {props.parts[0].exercises} </p>
            <p> {props.parts[1].name} {props.parts[1].exercises} </p>
            <p> {props.parts[2].name} {props.parts[2].exercises} </p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
          <b>total of {props.count} exercises</b>
        </div>
      )
}

const Course = ({ course }) => { 
  
  const rows = () => course.parts.map(part =>
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  )
  const result = course.parts.map(part => part.exercises)

  const reducer = (sum, currentValue) => sum + currentValue

  return (
    <div>
    <Header course={course} />
    { rows() }
    <Total count={result.reduce(reducer)} />
    </div>
  )
}

export default Course