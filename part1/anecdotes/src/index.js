import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const points = Array(6).fill(0)


const SetAnecdote = (props) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            { props.text } <br />
            has { points[props.selected] } votes
        </div>
    )
}

const FavAnecdote = (props) => {
    let max=0 
    let index=0
    let fav=0;
    points.forEach(value => { 
        if (value > max) {
            max=value
            fav = index
        }
        index++
    })

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            { props.anecdotes[fav] } <br />
            has { max } votes
        </div>
    )
}

const VoteButton = (props) => (
    <>
    <button onClick={props.onClick}>vote
    </button>
    </>
)

const Button = (props) => (
    <>
        <button onClick={props.onClick}>next anecdote
        </button>
    </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const refresh = () => {
    points[selected] += 1
    ReactDOM.render(<App anecdotes={props.anecdotes} />, 
    document.getElementById('root'))
  }
  
  return (
    <div>
        <SetAnecdote selected={selected} text={props.anecdotes[selected]} />
        <VoteButton onClick={() => refresh()}  />
        <Button onClick={() =>setSelected( Math.floor(6.*Math.random())) } />
        <FavAnecdote anecdotes={props.anecdotes} />
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
