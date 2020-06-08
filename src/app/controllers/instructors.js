const { age, date } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        return res.render("instructors/index")

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

        let {avatar_url, name, birth, gender, services} = req.body

        return
    },

    //showData
    show(req, res) {

        return

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

        return

    },

    //deleteUser
    delete(req, res) {

        return

    },
}