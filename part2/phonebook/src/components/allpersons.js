import React from 'react'

const AllPersons = (props) => {
const newFilter = props.newFilter;
const personList = props.personList;
const deletePerson = props.deletePerson;

  const Name = ( props ) => {
        const lowerFilter = newFilter.toLowerCase()
        const lowerName = props.name.toLowerCase()

        return (
          lowerName.includes(lowerFilter) ? 
          <li>{props.name} {props.number} {'  '} 
            <button onClick={(event) => deletePerson(props.id, event)}>delete</button>

          </li> : ' '
        ) 
      }

    const rows = () => personList.map(person =>
        <Name
          name={person.name}
          number={person.number}
          id={person.id}
          key={person.name}
        />
    )   

  return (
        <div> { rows() } </div>
    )
} 

export default AllPersons;
