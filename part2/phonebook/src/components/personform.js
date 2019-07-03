import React from 'react'

const Personform = ({name, handlename, newnumber, handlenumber, addName}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={name} onChange={handlename} />
            </div>
            <div>
                number: <input value={newnumber} onChange={handlenumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
} 

export default Personform;


