require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = (error,request,response,next) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({error:'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(
        `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${new Date()}</p>
        </div>`
    )
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then( person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request,response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    person.save().then(p => {
      response.json(p)
    }).then(saved => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      response.json(saved)
      })  
})

app.delete('/api/persons/:id', (request,response) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
      
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.use(errorHandler)
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})