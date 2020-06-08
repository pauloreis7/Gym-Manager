const express = require('express')
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')

const routes = express.Router()

// Instrutors Routes

routes.get('/', function (req, res) {
    return res.redirect("/instructors")
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', instructors.create)

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.post('/instructors', instructors.post) 

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

// Members Routes

routes.get('/members', members.index)

routes.get('/members/create', members.create)

routes.get('/members/:id', members.show)

routes.get('/members/:id/edit', members.edit)

routes.post('/members', members.post) 

routes.put('/members', members.put)

routes.delete('/members', members.delete)


module.exports = routes

//Usar regras comunicação HTTP utilizando os verbos que nos dizem oque está acontecendo, oque o programa está fazendo, qual o tipo de comunicação estamos tendo no frontend e backend.
//HTTP VERBS
// GET: Receber RESOURCE
// POST: CRIAR um novo RESOURCE com dados enviados
// PUT: ATUALIZAR RESOURCE
// DELETE: DELETAR RESOURCE