require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('build'))
app.use(bodyParser.json())

const Person = require('./models/person')

/*
const cors = require('cors')
app.use(cors())
*/
const morgan = require('morgan')

app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))


app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.get('/info', (req, res) => {
  var count = 0
  Person.find({}).then(result => {
    result.forEach(person => { count++ })
    res.send('Phonebook has info for ' + count + ' people</br></br>' + Date())
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => { response.status(204).end() })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    console.log('name missing')
    return response.status(400).json({
      error: 'name missing :('
    })
  }

  if (!body.number) {
    console.log('number missing')
    return response.status(400).json({
      error: 'number missing :('
    })
  }

  const result = Person.find({ name: body.name })
  if(result.length > 0) {
    return response.status(400).json({
      error: 'name must be unique!'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => {
      next(error)
    })
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNumber => {
      response.json(updatedNumber.toJSON())
    })
    .catch(error => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

morgan.token('body', function getBody (req) {
  return (req.body===undefined) ? null : JSON.stringify(req.body)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})