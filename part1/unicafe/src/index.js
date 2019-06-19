import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
  
    const Statistic = (props) => {
        return (
            <tr><td>{props.text}</td><td>{props.value}</td></tr>
        )
  }

  const Statistics = (props) => {
    const { good, neutral, bad } = props
    return (
        <div>
        <h1>statistics</h1>
        { good + neutral + bad === 0 &&
            <div>No beedback given</div>
        }
        { good + neutral + bad !== 0 &&
            <table><tbody>
            <Statistic text="good" value ={good} />
            <Statistic text="neutral" value ={neutral} />
            <Statistic text="bad" value ={bad} />
            <Statistic text="all" value ={good+neutral+bad} />
            <Statistic text="average" value ={(good-bad)/(good+neutral+bad)} />
            <Statistic text="positive" value ={(good)/(good+neutral+bad)} />
            </tbody></table>
        }
        </div>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={() =>setGood(good + 1)} text="good"/>
        <Button onClick={() =>setNeutral(neutral + 1)} text="neutral"/>
        <Button onClick={() =>setBad(bad + 1)} text="bad"/>

        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
