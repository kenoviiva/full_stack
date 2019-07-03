import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Personform from './components/personform'
import AllPersons from './components/allpersons'
import personService from './services/protocol'

const normalStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderstyle: 'solid',
  borderradius: 5,
  padding: 10,
  marginbottom: 10
}

const warningStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderstyle: 'solid',
  borderradius: 5,
  padding: 10,
  marginbottom: 10
}

const App = () => {
  const [ personList, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageStyle, setStyle] = useState(normalStyle)

useEffect(() => { 
    personService
      .getAll()
      .then(response => { 
        setPersons(response)
      })
  }, [])

  const deletePerson = (id, event) => {
    event.preventDefault()
    console.log('delete ', id)
    const looked = personList.find(n => n.id === id)
    if (window.confirm("Delete " + looked.name + "?")) { 
      console.log('liquidation confirmed');
      personService
      .liquidate(id)
      .then(response => { 
        setPersons(personList.filter(n => n.id !== id))  
        console.log('del',personList)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }

  const addName = (event) => {
    event.preventDefault()
  
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const result = personList.filter(n => n.name===newName)

    if(result.length > 0)  {
      console.log('result.id',result[0].id)
      if (window.confirm(newName + " is already added to phonebook, replace the old number with a new one?" )) {
        personService
        .update(result[0].id, nameObject)
        .then(response => {
          setPersons(personList.map(note => note.id !== result[0].id ? note : nameObject))
        })
        .catch(error => {
          setStyle(warningStyle)
          setErrorMessage( "Information of " + newName + " has already been removed from server!!!" )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(personList.filter(n => n.id !== result[0].id))
        })
        setNewName('')
        setNewNumber('')

      }}

    if(result.length === 0) {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(personList.concat(response))
        setErrorMessage( "Added " + newName )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2> Phonebook </h2>

      <Notification message={errorMessage} />

      <Filter filter={newFilter} handler={handleFilterChange} />

      <h3>Add a new</h3>

      <Personform 
          name={newName} handlename={handleNameChange} 
          newnumber={newNumber} handlenumber={handleNumberChange}
          addName={addName}
      />
      <h3>Numbers</h3>

      <AllPersons newFilter={newFilter} personList={personList} deletePerson={deletePerson} />

    </div>
  )
}

export default App;
