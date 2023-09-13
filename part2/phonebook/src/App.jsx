import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, SetNewNumber] = useState('')
  const [newFilter, SetNewFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  

  useEffect(() => {
    personService.getAll()
      .then(returned => {
        setPersons(returned)
      })
  }, [])
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {name : newName, number : newNumber}
    const sameperson = persons.find((person) =>
        person.name === newName
    )
    
    console.log(sameperson)
    
    if (sameperson !== undefined  ){
      sameperson.number = newNumber
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one ?`)) {
        personService
          .update(sameperson.id, sameperson).then(returnedPerson => {
            console.log(`${returnedPerson.name} successfully updated`)
            setPersons(persons.map(person => person.id !== sameperson.id ? person : returnedPerson))
            setNewName('')
            SetNewNumber('')
          })
          .catch((error) => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== sameperson.id))
            setNewName('')
            SetNewNumber('')
            setAddedMessage(
              `information of ${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
            })
      }
    }else{
      personService
      .create(personObj)
      .then(returned => {
        (persons.concat(returned))
        setNewName('')
        SetNewNumber('')
      }).then( () => {
        setAddedMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id) => {
    const filteredPerson = persons.find(person => person.id === id)
    console.log(filteredPerson)
    const Name = filteredPerson.name
    if (window.confirm(`Delete ${Name} ?`)) {
      personService
        .remove(id)
      console.log(`${Name} successfully deleted`)
  }
}

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    SetNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    SetNewFilter(event.target.value)
    const regex = new RegExp(newFilter, 'i')
    const searchFilter = () => persons.filter((person) => person.name.match(regex)) 
    setPersons(searchFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {addedMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2> Add New</h2>
      <PersonForm onSubmit={addPerson} newName = {newName} handleNameChange = {handleNameChange} handleNumberChange ={handleNumberChange} newNumber = {newNumber} />
      <h2>Numbers</h2>
      <Persons persons ={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App