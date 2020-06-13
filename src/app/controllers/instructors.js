const { age, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {
        
        const { filter } = req.query

        if (filter) {
            Instructor.findFilter(filter, function (instructors) {
                return res.render("instructors/index", { instructors, search:filter })
            })
        } else {
            Instructor.all( function (instructors) {
                return res.render("instructors/index", { instructors })
            })
        }
    },

    //createPage
    create(req, res) {

        return res.render("instructors/create")

    },

    //createUser
    post(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] =="") {
                return res.send('Please fill all fields')
            }
        }

        Instructor.create(req.body, function (instructor) {
            return res.redirect(`/instructors/${ instructor.id }`)
        })
    },

    //showData
    show(req, res) {

        Instructor.find(req.params.id, function (instructor) {
            if (!instructor) return res.send("Instrutor não encontrado!")

            instructor.birth = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },

    //editPage
    edit(req, res) {

        Instructor.find(req.params.id, function (instructor) {
            if (!instructor) return res.send("Instrutor não encontrado!")

            instructor.birth = date(instructor.birth).iso
            
            return res.render("instructors/edit", { instructor })
        })
    },

    //putUser
    put(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] =="") {
                return res.send('Please fill all fields')
            }
        }

        Instructor.update(req.body, function () {
            
            return res.redirect(`/instructors/${ req.body.id }`)
        })
    },

    //deleteUser
    delete(req, res) {

        Instructor.delete(req.body.id, function () {

            return res.redirect("/instructors")
        })
    },
}