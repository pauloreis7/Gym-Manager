const { age, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        Instructor.all( function (instructors) {
            return res.render("instructors/index", { instructors })
        })
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
            return res.redirect(`/instructors/${ Instructor.id }`)
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

        return

    },

    //putUser
    put(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] =="") {
                return res.send('Please fill all fields')
            }
        }

        let {avatar_url, name, birth, gender, services} = req.body

    },

    //deleteUser
    delete(req, res) {

        return

    },
}