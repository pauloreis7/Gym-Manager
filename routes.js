const express = require('express')
const instructors = require('./instructors')

const routes = express.Router()

routes.get('/', function (req, res) {
    return res.redirect("/instructors")
})

routes.get('/instructors', function (req, res) {
    return res.render("instructors/index")
})

routes.get('/instructors/create', function (req, res) {
    return res.render("instructors/create")
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.post('/instructors', instructors.post) 

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

routes.get('/membres', function (req, res) {
    return res.send("membres")
})

module.exports = routes

//Usar regras comunicação HTTP utilizando os verbos que nos dizem oque está acontecendo, oque o programa está fazendo, qual o tipo de comunicação estamos tendo no frontend e backend.
//HTTP VERBS
// GET: Receber RESOURCE
// POST: CRIAR um novo RESOURCE com dados enviados
// PUT: ATUALIZAR RESOURCE
// DELETE: DELETAR RESOURCE