import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
          <h1>{props.course.name}</h1>
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
          <p>Number of exercises {props.count}</p>
        </div>
      )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
          
  return (
    <div>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total count = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
